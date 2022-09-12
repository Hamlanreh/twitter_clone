import React, { useState } from 'react';
import './Tweet.css';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import { deleteTweet } from '../../../../redux/tweet/tweetSlice';
import { postRetweet } from '../../../../redux/retweet/retweetSlice';
import { createBookmark } from '../../../../redux/bookmark/bookmarkSlice';

const Tweet = ({ tweet }) => {
  const dispatch = useDispatch();
  const [showMore, setShowMore] = useState(false);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleCreateRetweet = id => {
    dispatch(postRetweet(id));
  };

  const handleDeleteTweet = id => {
    dispatch(deleteTweet(id));
  };

  const handleCreateBookmark = id => {
    dispatch(createBookmark(id));
  };

  return (
    <article className="tweet">
      <div className="tweet__user">
        <div className="tweet__userImgBox">
          {/* <img className="tweet__userImg" src="" alt="" /> */}
        </div>
      </div>
      <div className="tweet__container">
        <div className="tweet__header">
          <h4>
            <span className="tweet__author">
              {`
                ${tweet.user.lastname[0].toUpperCase()}${tweet.user.lastname.slice(
                1
              )} ${tweet.user.firstname[0].toUpperCase()}${tweet.user.firstname.slice(
                1
              )}
              `}
            </span>
            <span>@{tweet.user.username}</span>
            <span>·</span>
            <Moment fromNow ago>
              {new Date(tweet.createdAt).getTime()}
            </Moment>
          </h4>
          <div className="tweet__moreBox">
            <span>
              {isAuthenticated && user._id === tweet.user._id && (
                <button
                  className="tweet__deleteBtn"
                  onClick={() => handleDeleteTweet(tweet._id)}
                >
                  Delete
                </button>
              )}
            </span>
            <span className="tweet__moreListBox">
              <MoreHorizOutlinedIcon onClick={() => setShowMore(!showMore)} />
              {showMore && (
                <ul className="tweet__moreList">
                  <li
                    className="tweet__moreItem"
                    onClick={() => handleCreateBookmark(tweet._id)}
                  >
                    <BookmarkBorderOutlinedIcon
                      sx={{
                        marginRight: '1rem',
                        fontSize: '2rem',
                        color: '#fff',
                      }}
                    />
                    Bookmark
                  </li>
                </ul>
              )}
            </span>
          </div>
        </div>

        <div className="tweet__content">
          {tweet?.text && <p>{tweet.text}</p>}
          {tweet?.upload && (
            <div className="tweet__upload">{tweet?.upload}</div>
          )}
        </div>

        <div className="tweet__footer">
          <div>
            <ModeCommentOutlinedIcon />
            <p>Comment</p>
          </div>
          <div onClick={() => handleCreateRetweet(tweet._id)}>
            <RepeatOutlinedIcon />
            <p>Reply</p>
          </div>
          <div>
            <FavoriteBorderOutlinedIcon />
            <p>Like</p>
          </div>
          <div>
            <IosShareRoundedIcon />
            <p>Share</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
