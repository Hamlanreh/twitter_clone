import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../components/utils/axios';

const initialState = {
  bookmarks: [],
  isLoading: false,
  error: null,
};

export const createBookmark = createAsyncThunk(
  'bookmark/createBookmark',
  async (tweetId, ThunkAPI) => {
    try {
      await axios.post(`/tweets/${tweetId}/bookmarks`);
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  'bookmark/deleteBookmark',
  async ({ tweetId, bookmarkId }, ThunkAPI) => {
    try {
      await axios.delete(`/tweets/${tweetId}/bookmarks/${bookmarkId}`);
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getMyBookmarks = createAsyncThunk(
  'bookmark/getMyBookmarks',
  async ({ userId, page }, ThunkAPI) => {
    try {
      const res = await axios.get(
        `/tweets/${userId}/bookmarks?page=${page}&limit=20&sort=-createdAt`
      );
      return res.data;
    } catch (err) {
      return ThunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  // reducers: {},
  extraReducers: {
    [createBookmark.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [createBookmark.fulfilled]: state => {
      state.isLoading = false;
      state.error = null;
    },
    [createBookmark.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },

    [deleteBookmark.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteBookmark.fulfilled]: state => {
      state.isLoading = false;
      state.error = null;
    },
    [deleteBookmark.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },

    [getMyBookmarks.pending]: state => {
      state.isLoading = true;
      state.error = null;
      state.bookmarks = [];
    },
    [getMyBookmarks.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.bookmarks = payload.data;
    },
    [getMyBookmarks.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload.message;
    },
  },
});

export default bookmarkSlice.reducer;
