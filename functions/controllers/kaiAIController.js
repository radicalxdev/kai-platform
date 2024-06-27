const admin = require('firebase-admin');
const storage = admin.storage();
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { default: axios } = require('axios');
const { logger, https } = require('firebase-functions/v1');
const { Timestamp } = require('firebase-admin/firestore');
const { BOT_TYPE } = require('../constants');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const busboy = require('busboy');
const app = express();
const functions = require('firebase-functions');
const DEBUG = process.env.DEBUG;

/**
 * Simulates communication with a Kai AI endpoint.
 *
 * @param {object} payload - The properties of the communication.
 * @param {object} props.data - The payload data object used in the communication.
 *  @param {Array} props.data.messages - An array of messages for the current user chat session.
 *  @param {object} props.data.user - The user object.
 *    @param {string} props.data.user.id - The id of the current user.
 *    @param {string} props.data.user.fullName - The user's full name.
 *    @param {string} props.data.user.email - The users email.
 *  @param {object} props.data.tool_data - The payload data object used in the communication.
 *    @param {string} props.data.tool_data.tool_id - The payload data object used in the communication.
 *    @param {Array} props.data.tool_data.inputs - The different form input values sent for a tool.
 *  @param {string} props.data.type - The payload data object used in the communication.
 *
 * @return {object} The response from the AI service.
 */
const kaiCommunicator = async (payload) => {
  try {
    DEBUG && logger.log('kaiCommunicator started, data:', payload.data);

    const { messages, user, tool_data, type } = payload.data;
    const isToolCommunicator = type === BOT_TYPE.TOOL;
    const KAI_API_KEY = process.env.NEXT_PUBLIC_KAI_API_KEY;
    const KAI_ENDPOINT = process.env.NEXT_PUBLIC_KAI_ENDPOINT;

    DEBUG &&
      logger.log(
        'Communicator variables:',
        `API_KEY: ${KAI_API_KEY}`,
        `ENDPOINT: ${KAI_ENDPOINT}`
      );

    const headers = {
      'API-Key': KAI_API_KEY,
      'Content-Type': 'application/json',
    };

    const kaiPayload = {
      user,
      type,
      ...(isToolCommunicator ? { tool_data } : { messages }),
    };

    DEBUG && logger.log('KAI_ENDPOINT', KAI_ENDPOINT);
    DEBUG && logger.log('kaiPayload', kaiPayload);

    const resp = await axios.post(KAI_ENDPOINT, kaiPayload, {
      headers,
    });

    DEBUG && logger.log('kaiCommunicator response:', resp.data);

    return { status: 'success', data: resp.data };
  } catch (error) {
    const {
      response: { data },
    } = error;
    const { message } = data;
    DEBUG && logger.error('kaiCommunicator error:', data);
    throw new HttpsError('internal', message);
  }
};

/**
 * Manages communications for a specific chat session with a chatbot, updating and retrieving messages.
 *
 * @param {object} props - The properties of the communication.
 * @param {object} props.data - The data object containing the message and id.
 * @param {string} props.data.id - The id of the chat session.
 * @param {string} props.data.message - The message object.
 *
 * @return {object} The response object containing the status and data.
 */
const chat = onCall(async (props) => {
  try {
    DEBUG && logger.log('Communicator started, data:', props.data);

    const { message, id } = props.data;

    DEBUG &&
      logger.log(
        'Communicator variables:',
        `API_KEY: ${process.env.KAI_API_KEY}`,
        `ENDPOINT: ${process.env.KAI_ENDPOINT}`
      );

    const chatSession = await admin
      .firestore()
      .collection('chatSessions')
      .doc(id)
      .get();

    if (!chatSession.exists) {
      logger.log('Chat session not found: ', id);
      throw new HttpsError('not-found', 'Chat session not found');
    }

    const { user, type, messages } = chatSession.data();

    let truncatedMessages = messages;

    // Check if messages length exceeds 50, if so, truncate
    if (messages.length > 100) {
      truncatedMessages = messages.slice(messages.length - 65);
    }

    // Update message structure here
    const updatedMessages = truncatedMessages.concat([
      {
        ...message,
        timestamp: Timestamp.fromMillis(Date.now()), // ISO 8601 format string
      },
    ]);

    await chatSession.ref.update({ messages: updatedMessages });

    // Construct payload for the kaiCommunicator
    const KaiPayload = {
      messages: updatedMessages,
      type,
      user,
    };

    const response = await kaiCommunicator({
      data: KaiPayload,
    });

    DEBUG && logger.log('kaiCommunicator response:', response.data);

    // Process response and update Firestore
    const updatedResponseMessages = updatedMessages.concat(
      response.data?.data?.map((msg) => ({
        ...msg,
        timestamp: Timestamp.fromMillis(Date.now()), // ensure consistent timestamp format
      }))
    );

    await chatSession.ref.update({ messages: updatedResponseMessages });

    if (DEBUG) {
      logger.log(
        'Updated chat session: ',
        (await chatSession.ref.get()).data()
      );
    }

    return { status: 'success' };
  } catch (error) {
    DEBUG && logger.log('Communicator error:', error);
    throw new HttpsError('internal', error.message);
  }
});

/**
 * Handles tool communications by processing input data and optional file uploads.
 * It supports both JSON and form-data requests to accommodate different client implementations.
 *
 * @param {Request} req - The Express request object, which includes form data and files.
 * @param {Response} res - The Express response object used to send back the HTTP response.
 * @return {void} Sends a response to the client based on the processing results.
 * @throws {HttpsError} Throws an error if processing fails or data is invalid.
 */
app.post('/api/tool/', (req, res) => {
  const bb = busboy({ headers: req.headers });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const uploads = [];
  const data = [];

  bb.on('file', (fieldname, file, info) => {
    const { filename } = info;
    const fileId = uuidv4();
    const filePath = `uploads/${fileId}-${filename}`;
    const { name: bucketName } = storage.bucket();

    const fileWriteStream = storage
      .bucket(bucketName)
      .file(filePath)
      .createWriteStream();

    file.pipe(fileWriteStream);

    const uploadPromise = new Promise((resolve, reject) => {
      fileWriteStream.on('finish', async () => {
        // Make the file publicly readable
        await storage.bucket(bucketName).file(filePath).makePublic();

        // Construct the direct public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${filePath}`;

        DEBUG &&
          console.log(
            `File ${filename} uploaded and available at ${publicUrl}`
          );

        resolve({ filePath, url: publicUrl, filename });
      });

      fileWriteStream.on('error', reject);
    });

    uploads.push(uploadPromise);
  });

  bb.on('field', (name, value) => {
    data[name] = value;
  });

  bb.on('finish', async () => {
    try {
      DEBUG && logger.log('data:', JSON.parse(data?.data));

      const {
        tool_data: { inputs, ...otherToolData },
        ...otherData
      } = JSON.parse(data?.data);

      const results = await Promise.all(uploads);

      res.set('Access-Control-Allow-Origin', '*'); // @todo: set the correct origin for security!
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');

      const modifiedInputs =
        uploads?.length > 0
          ? [...inputs, { name: 'files', value: results }]
          : inputs;

      const response = await kaiCommunicator({
        data: {
          ...otherData,
          tool_data: {
            ...otherToolData,
            inputs: modifiedInputs,
          },
        },
      });
      logger.log('123131231231313132131');
      // await createToolSession({
      //   data: {
      //     user: otherData.user,
      //     tool_data: {
      //       ...otherToolData,
      //       inputs: modifiedInputs,
      //     },
      //     type: otherData.type,
      //   },
      // });
      res.status(200).json({ success: true, data: response.data });
    } catch (error) {
      logger.error('Error processing request:', error);
      res.status(500).json({ success: false, message: error?.message });
    }
  });

  bb.end(req.rawBody);
});

/**
 * This creates a chat session for a user.
 * If the chat session already exists, it will return the existing chat session.
 * Otherwise, it will create a new chat session and send the first message.
 *
 * @param {Object} props - The properties passed to the function.
 * @param {Object} props.data - The data object containing the user, challenge, message, and botType.
 * @param {Object} props.data.user - The user object.
 * @param {Object} props.data.message - The message object.
 * @param {Object} props.data.type - The bot type.
 *
 * @return {Promise<Object>} - A promise that resolves to an object containing the status and data of the chat sessions.
 * @throws {HttpsError} Throws an error if there is an internal error.
 */
const createChatSession = onCall(async (props) => {
  try {
    DEBUG && logger.log('Communicator started, data:', props.data);

    const { user, message, type } = props.data;

    if (!user || !message || !type) {
      logger.log('Missing required fields', props.data);
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    const initialMessage = {
      ...message,
      timestamp: Timestamp.fromMillis(Date.now()),
    };

    // Create new chat session if it doesn't exist
    const chatSessionRef = await admin
      .firestore()
      .collection('chatSessions')
      .add({
        messages: [initialMessage],
        user,
        type,
        createdAt: Timestamp.fromMillis(Date.now()),
        updatedAt: Timestamp.fromMillis(Date.now()),
      });

    // Send trigger message to ReX AI
    const response = await kaiCommunicator({
      data: {
        messages: [initialMessage],
        user,
        type,
      },
    });

    DEBUG && logger.log('response: ', response?.data, 'type', typeof response);

    const { messages } = (await chatSessionRef.get()).data();
    DEBUG && logger.log('updated messages: ', messages);

    // Add response to chat session
    const updatedResponseMessages = messages.concat(
      Array.isArray(response.data?.data)
        ? response.data?.data?.map((message) => ({
            ...message,
            timestamp: Timestamp.fromMillis(Date.now()),
          }))
        : [
            {
              ...response.data?.data,
              timestamp: Timestamp.fromMillis(Date.now()),
            },
          ]
    );

    await chatSessionRef.update({
      messages: updatedResponseMessages,
      id: chatSessionRef.id,
    });

    const updatedChatSession = await chatSessionRef.get();
    DEBUG && logger.log('Updated chat session: ', updatedChatSession.data());

    const createdChatSession = {
      ...updatedChatSession.data(),
      id: updatedChatSession.id,
    };

    DEBUG && logger.log('Created chat session: ', createdChatSession);

    logger.log('Successfully communicated');
    return {
      status: 'created',
      data: createdChatSession,
    };
  } catch (error) {
    logger.error(error);
    throw new HttpsError('internal', error.message);
  }
});

const createToolSession = onCall(async (props) => {
  try {
    const { user, tool_data, type, messages, sessionId } = props.data;
    if (!user || !tool_data || !type || !messages) {
      logger.log('Missing required fields', props.data);
      throw new HttpsError('invalid-argument', 'Missing required fields');
    }

    const toolSessionId = sessionId || uuidv4();
    const initialToolData = {
      ...tool_data,
      timestamp: Timestamp.fromMillis(Date.now()),
    };
    const toolSessionRef = admin
      .firestore()
      .collection('toolSessions')
      .doc(toolSessionId);
    const toolSessionDoc = await toolSessionRef.get();
    // // Create new tool session if it doesn't exist
    // const toolSessionRef = await admin
    //   .firestore()
    //   .collection('toolSessions')
    //   .add({
    //     tool_data: [initialToolData],
    //     user,
    //     type,
    //     messages,
    //     createdAt: Timestamp.fromMillis(Date.now()),
    //     updatedAt: Timestamp.fromMillis(Date.now()),
    //   });
    if (toolSessionDoc.exists) {
      // Update the existing session by replacing the data
      await toolSessionRef.update({
        tool_data: [initialToolData],
        user,
        type,
        messages,
        updatedAt: Timestamp.fromMillis(Date.now()),
      });
    } else {
      // Create a new session
      await toolSessionRef.set({
        tool_data: [initialToolData],
        user,
        type,
        messages,
        createdAt: Timestamp.fromMillis(Date.now()),
        updatedAt: Timestamp.fromMillis(Date.now()),
      });
      logger.log('Created new tool session:', toolSessionId);
    }

    const updatedToolSession = await toolSessionRef.get();
    const createdToolSession = {
      ...updatedToolSession.data(),
      id: updatedToolSession.id,
    };

    logger.log(
      'Successfully created or updated tool session:',
      createdToolSession
    );
    return {
      status: 'created',
      data: createdToolSession,
    };
  } catch (error) {
    logger.error(error);
    throw new HttpsError('internal', error.message);
  }
});

const fetchUserHistoryData = onCall(async (props) => {
  try {
    const { userId } = props.data;

    if (!userId) {
      throw new HttpsError(
        'invalid-argument',
        'Missing required field: userId'
      );
    }

    const historyCollection = admin.firestore().collection('toolSessions');
    const snapshot = await historyCollection
      .where('user.id', '==', userId)
      .get();

    if (snapshot.empty) {
      return { data: [] };
    }

    const historyData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { data: historyData };
  } catch (error) {
    functions.logger.error('Error fetching history data:', error);
    throw new HttpsError('internal', error.message);
  }
});

module.exports = {
  chat,
  tool: https.onRequest(app),
  createChatSession,
  createToolSession,
  fetchUserHistoryData,
};
