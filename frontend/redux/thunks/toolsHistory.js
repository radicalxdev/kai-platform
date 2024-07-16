import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import {
  setToolsHistory,
  setToolsHistoryError,
} from '@/redux/slices/toolsHistorySlice';

export const fetchToolsHistory = createAsyncThunk(
  'toolsHistory/fetch',
  async (_, { getState }) => {
    try {
      const { user } = getState();

      if (!user || !user.data || !user.data.id) {
        throw new Error('User ID is not available in the state.');
      }

      const userId = user.data.id;
      const firestore = getFirestore();
      const toolSessionsQuery = query(
        collection(firestore, 'toolSessions'),
        where('user.id', '==', userId)
      );

      const toolSessionsSnapshot = await getDocs(toolSessionsQuery);

      if (toolSessionsSnapshot.empty) {
        return null;
      }

      const toolSessions = toolSessionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return toolSessions;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch tools history.');
    }
  }
);

export const listenToToolsHistory = () => async (dispatch, getState) => {
  try {
    const { user } = getState();

    if (!user || !user.data || !user.data.id) {
      throw new Error('User ID is not available in the state.');
    }

    const userId = user.data.id;
    const firestore = getFirestore();
    const toolSessionsQuery = query(
      collection(firestore, 'toolSessions'),
      where('user.id', '==', userId)
    );

    return onSnapshot(
      toolSessionsQuery,
      (snapshot) => {
        const toolSessions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setToolsHistory(toolSessions));
      },
      (error) => {
        dispatch(setToolsHistoryError(error.message));
      }
    );
  } catch (error) {
    dispatch(setToolsHistoryError(error.message));
    return null;
  }
};
