import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWaterLogs } from './waterAPI';

export const fetchWaterLogs = createAsyncThunk(
  'water/fetch',
  async (token) => {
    const data = await getWaterLogs(token);
    return data;
  }
);


const waterSlice = createSlice({
  name: 'water',
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaterLogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWaterLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload;
      })
      .addCase(fetchWaterLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default waterSlice.reducer;
