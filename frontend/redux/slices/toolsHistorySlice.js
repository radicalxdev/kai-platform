import { createSlice } from '@reduxjs/toolkit';

import { fetchToolsHistory } from '../thunks/toolsHistory';

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const toolsHistorySlice = createSlice({
  name: 'toolsHistory',
  initialState,
  reducers: {
    setToolsHistory: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setToolsHistoryError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchToolsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setToolsHistory, setToolsHistoryError } =
  toolsHistorySlice.actions;
export default toolsHistorySlice.reducer;
