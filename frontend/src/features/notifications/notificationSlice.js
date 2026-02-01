import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMyNotifications } from './notificationAPI';

export const fetchNotifications = createAsyncThunk('notification/fetch', async () => {
  const res = await getMyNotifications();
  return res.data;
});

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default notificationSlice.reducer;
