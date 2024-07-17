import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const fetchToolHistory = createAsyncThunk(
  'toolHistory/fetchToolHistory',
  async ({ firestore }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const userId = user?.data?.id;

      if (!userId) {
        return rejectWithValue('User ID is not available');
      }

      const toolSessionSnapshot = query(
        collection(firestore, 'toolSessions'),
        where('userID', '==', userId)
      );

      const querySnapshot = await getDocs(toolSessionSnapshot);
      const outputData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return outputData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
