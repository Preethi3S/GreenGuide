import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchReminders as getAllReminders } from './reminderAPI';

export const fetchReminders = createAsyncThunk('reminder/fetch', async () => {
  const res = await getAllReminders();
  return res.data;
});

const reminderSlice = createSlice({
  name: 'reminder',
  initialState: {
    reminders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReminders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReminders.fulfilled, (state, action) => {
        state.loading = false;
        state.reminders = action.payload;
      })
      .addCase(fetchReminders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reminderSlice.reducer;
