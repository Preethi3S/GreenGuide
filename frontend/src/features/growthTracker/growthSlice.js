import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGrowthLogs } from './growthAPI';

export const getGrowthLogs = createAsyncThunk('growth/fetch', async () => {
  const res = await fetchGrowthLogs();
  return res.data;
});

const growthSlice = createSlice({
  name: 'growth',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGrowthLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGrowthLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(getGrowthLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default growthSlice.reducer;
