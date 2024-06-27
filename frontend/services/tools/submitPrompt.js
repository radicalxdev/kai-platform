import axios from 'axios';

import createToolSession from './createToolSession';

import store from '@/redux/store';
import fetchToolsHistory from '@/redux/thunks/toolsHistory';

const submitPrompt = async (payload, files, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    const url = process.env.NEXT_PUBLIC_KAI_ENDPOINT;

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const toolSessionPayload = {
      user: payload.user,
      tool_data: { ...payload.tool_data },
      type: payload.type,
      messages: response.data,
      sessionId: payload.sessionId,
    };

    // Await createToolSession and handle the result properly
    const createdToolSession = await createToolSession(
      toolSessionPayload,
      dispatch
    );

    // Fetch the updated tools history after creating the new session
    const historyData = await dispatch(
      fetchToolsHistory({ userId: payload.user.id })
    );

    // Manually update the state and local storage with the new data
    const state = store.getState().toolsHistory;
    const updatedData = [...state.data, createdToolSession];
    const updatedState = { ...state, data: updatedData };

    // Save the updated state to local storage
    localStorage.setItem('toolsHistory', JSON.stringify(updatedState));

    return response.data?.data;
  } catch (err) {
    const { response } = err;

    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
