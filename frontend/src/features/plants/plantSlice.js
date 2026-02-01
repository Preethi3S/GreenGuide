import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMyPlants } from './plantAPI';

export const fetchPlants = createAsyncThunk('plant/fetch', async () => {
  const res = await fetchMyPlants();
  return res.data;
});

const plantSlice = createSlice({
  name: 'plant',
  initialState: {
    plants: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlants.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlants.fulfilled, (state, action) => {
        state.loading = false;
        state.plants = action.payload;
      })
      .addCase(fetchPlants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default plantSlice.reducer;
