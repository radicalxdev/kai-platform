import { createSlice } from '@reduxjs/toolkit';

import fetchToolsHistory from '../thunks/toolsHistory';

const initialState = {
  loading: true,
  data: [],
  error: null,
};

const toolsHistorySlice = createSlice({
  name: 'toolsHistory',
  initialState,
  reducers: {
    resetToolsHistory: (state) => {
      state.loading = true;
      state.data = [];
      state.error = null;
      localStorage.removeItem('toolsHistory');
    },
    setToolsHistoryLoading: (state, action) => {
      state.loading = action.payload;
      state.error = null; // Clear any existing error when loading state changes
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToolsHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchToolsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchToolsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetToolsHistory, setToolsHistoryLoading } =
  toolsHistorySlice.actions;

export default toolsHistorySlice.reducer;
