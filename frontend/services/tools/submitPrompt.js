import axios from 'axios';

import createToolSession from './createToolSession';

const submitPrompt = async (payload, files, dispatch) => {
  try {
    const formData = new FormData();
    formData.append('data', JSON.stringify(payload));

    if (!!files && files?.length > 0) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    }

    const response = await axios.post('/api/tool/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const toolSessionPayload = {
      user: payload.user,
      tool_data: { ...payload.tool_data },
      type: payload.type,
      outputs: response.data,
      sessionId: payload.sessionId,
    };

    const createdToolSession = await createToolSession(
      toolSessionPayload,
      dispatch
    );

    return response.data?.data;
  } catch (err) {
    const { response } = err;
    throw new Error(
      response?.data?.message || `Error: could not send prompt, ${err}`
    );
  }
};

export default submitPrompt;
