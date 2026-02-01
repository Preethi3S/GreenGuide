import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPosts } from './communityAPI';

export const fetchCommunityPosts = createAsyncThunk('community/fetch', async () => {
  const res = await getAllPosts();
  return res.data;
});

const communitySlice = createSlice({
  name: 'community',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunityPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommunityPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchCommunityPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default communitySlice.reducer;
