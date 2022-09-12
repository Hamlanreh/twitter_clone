import { configureStore } from '@reduxjs/toolkit';
import authSlicer from './redux/auth/authSlice';
import tweetSlicer from './redux/tweet/tweetSlice';
import retweetSlicer from './redux/retweet/retweetSlice';
import bookmarkSlicer from './redux/bookmark/bookmarkSlice';
import homeSlicer from './redux/home/homeSlice';

const store = configureStore({
  reducer: {
    auth: authSlicer,
    tweet: tweetSlicer,
    retweet: retweetSlicer,
    bookmark: bookmarkSlicer,
    home: homeSlicer,
  },
});

export default store;
