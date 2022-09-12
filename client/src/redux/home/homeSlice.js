import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../components/utils/axios';

const initialState = {
  tweetsAndRetweets: [],
  isLoading: false,
};

export const getTweetsAndRetweets = createAsyncThunk(
  'home/getTweetsAndRetweets',
  async page => {
    try {
      const res = await axios.get(
        `home/getTweetsAndRetweets?page=${page}&limit=20&sort=-createdAt`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState,
  //   reducers: {},
  extraReducers: {
    [getTweetsAndRetweets.pending]: state => {
      state.tweetsAndRetweets = [];
      state.isLoading = true;
    },
    [getTweetsAndRetweets.fulfilled]: (state, { payload }) => {
      state.tweetsAndRetweets = payload.data;
      state.isLoading = false;
    },
    [getTweetsAndRetweets.rejected]: state => {
      state.isLoading = false;
    },
  },
});

// Export all the action
// export const {} = homeSlice.actions;

export default homeSlice.reducer;
