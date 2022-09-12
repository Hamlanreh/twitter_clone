import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../components/utils/axios';

const initialState = {
  isLoading: false,
};

export const postRetweet = createAsyncThunk(
  'retweet/createRetweet',
  async tweetId => {
    try {
      await axios.post(`/tweets/${tweetId}/retweets`);
    } catch (err) {
      return err;
    }
  }
);

export const deleteRetweet = createAsyncThunk(
  'retweet/createRetweet',
  async ({ tweetId, retweetId }) => {
    try {
      await axios.delete(`/tweets/${tweetId}/retweets/${retweetId}`);
    } catch (err) {
      return err;
    }
  }
);

const retweetSlice = createSlice({
  name: 'retweet',
  initialState,
  // reducers: {},
  extraReducers: {
    [postRetweet.pending]: state => {
      state.isLoading = true;
    },
    [postRetweet.fulfilled]: state => {
      state.isLoading = false;
    },
    [postRetweet.rejected]: state => {
      state.isLoading = false;
    },

    [deleteRetweet.pending]: state => {
      state.isLoading = true;
    },
    [deleteRetweet.fulfilled]: state => {
      state.isLoading = false;
    },
    [deleteRetweet.rejected]: state => {
      state.isLoading = false;
    },
  },
});

// export const {} = retweetSlice.actions;

export default retweetSlice.reducer;
