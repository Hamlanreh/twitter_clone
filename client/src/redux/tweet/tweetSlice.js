import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../components/utils/axios';

const initialState = {
  isLoading: false,
};

export const postTweet = createAsyncThunk(
  'tweet/postTweet',
  async tweetData => {
    try {
      const formData = new FormData();
      formData.append('text', tweetData.text);
      formData.append('upload', tweetData.upload);
      await axios.post('/tweets', formData);
    } catch (err) {
      return err;
    }
  }
);

export const deleteTweet = createAsyncThunk('tweet/deleteTweet', async id => {
  try {
    await axios.delete(`/tweets/${id}`);
  } catch (err) {
    return err;
  }
});

const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  //   reducers: {},
  extraReducers: {
    [postTweet.pending]: state => {
      state.isLoading = true;
    },
    [postTweet.fulfilled]: state => {
      state.isLoading = false;
    },
    [postTweet.rejected]: state => {
      state.isLoading = false;
    },

    [deleteTweet.pending]: state => {
      state.isLoading = true;
    },
    [deleteTweet.fulfilled]: state => {
      state.isLoading = false;
    },
    [deleteTweet.rejected]: state => {
      state.isLoading = false;
    },
  },
});

// Export all the action
// export const {} = authSlice.actions;

export default tweetSlice.reducer;
