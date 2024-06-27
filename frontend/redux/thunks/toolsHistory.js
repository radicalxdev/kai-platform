import { createAsyncThunk } from '@reduxjs/toolkit';
import { httpsCallable } from 'firebase/functions';

import { setToolsHistoryLoading } from '@/redux/slices/toolsHistorySlice';
import { functions } from '@/redux/store';

const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async ({ userId }, { dispatch }) => {
    try {
      dispatch(setToolsHistoryLoading(true)); // Set loading to true before fetching

      const fetchHistory = httpsCallable(functions, 'fetchUserHistoryData');
      const response = await fetchHistory({ userId });

      dispatch(setToolsHistoryLoading(false)); // Set loading to false after fetching

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export default fetchToolsHistory;
