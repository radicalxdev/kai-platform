import { createSlice } from '@reduxjs/toolkit';

import { fetchHistory } from '../thunks/history';

const initialState = {
  data: null,
  loading: true,
  error: null,
};

const HistorySlice = createSlice({
  name: 'outputHistory',
  initialState,
  reducers: {
    // Define any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default HistorySlice.reducer;
