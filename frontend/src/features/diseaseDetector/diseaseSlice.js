import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import  detectDisease  from './diseaseAPI.js';

export const fetchDiseasePrediction = createAsyncThunk('disease/predict', async (formData) => {
  const res = await detectDisease(formData);
  return res.data;
});

const diseaseSlice = createSlice({
  name: 'disease',
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearResult: (state) => {
      state.result = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseasePrediction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiseasePrediction.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
      })
      .addCase(fetchDiseasePrediction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearResult } = diseaseSlice.actions;
export default diseaseSlice.reducer;
