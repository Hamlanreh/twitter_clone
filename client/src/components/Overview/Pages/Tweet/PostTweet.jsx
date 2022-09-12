import React, { useState } from 'react';
import './PostTweet.css';
import { useDispatch } from 'react-redux';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';

import { postTweet } from '../../../../redux/tweet/tweetSlice';

const PostTweet = () => {
  const dispatch = useDispatch();
  const [tweetData, setTweetData] = useState({
    text: '',
    upload: '',
  });

  const handlePostTweet = e => {
    e.preventDefault();
    if (!tweetData.text) return;
    dispatch(postTweet(tweetData));
    setTweetData(state => ({ ...state, text: '', upload: '' }));
  };

  return (
    <div className="postTweet">
      <div className="postTweet__user">
        {/* <img className="postTweet__userImg" src="" alt="" /> */}
      </div>

      <form
        className="postTweet__form"
        encType="multipart/form-data"
        onSubmit={handlePostTweet}
      >
        <textarea
          className="postTweet__textarea"
          placeholder="Whats happening?"
          maxLength={180}
          value={tweetData.text}
          onChange={e =>
            setTweetData(state => ({
              ...state,
              text: e.target.value,
            }))
          }
        ></textarea>
        <div className="postTweet__moreBox">
          <div className="postTweet__moreLeft">
            <span className="postTweet__replyVisible">Everyone can reply</span>
            <span>
              <label htmlFor="postTweet__upload">
                <ImageRoundedIcon
                  sx={{ fontSize: '3rem', color: 'rgb(29, 155, 240)' }}
                />
              </label>
              <input
                id="postTweet__upload"
                className="postTweet__upload"
                type="file"
                accept="image/*"
                name="photo"
                onChange={e =>
                  setTweetData(state => ({
                    ...state,
                    upload: e.target.files[0],
                  }))
                }
              />
            </span>
          </div>

          <div className="postTweet__more">
            <button type="submit" className="postTweet__submitBtn">
              Tweet
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostTweet;
