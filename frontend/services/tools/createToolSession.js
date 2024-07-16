import { httpsCallable } from 'firebase/functions';

import { setCommunicatorLoading, setError } from '@/redux/slices/toolsSlice';
import { functions } from '@/redux/store';

/**
 
Creates a tool session.*
@param {Object} payload - The payload for creating the tool session.
@param {function} dispatch - The dispatch function for managing state.
@return {Object} - An object containing a status and data containing the session.
*/
const createToolSession = async (payload, dispatch) => {
  try {
    const createSession = httpsCallable(functions, 'createToolSession');
    dispatch(setCommunicatorLoading(true));
    const response = await createSession(payload);
    dispatch(setCommunicatorLoading(false));
    return response.data;
  } catch (err) {
    dispatch(setError('Error! Couldn\u0027t create tool session'));
    dispatch(setCommunicatorLoading(false));

    throw new Error('Error could not create tool session');
  }
};

export default createToolSession;
