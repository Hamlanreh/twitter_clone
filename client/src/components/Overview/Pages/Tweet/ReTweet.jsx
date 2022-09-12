import React from 'react';
import './ReTweet.css';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';

const ReTweet = ({ retweet }) => {
  return (
    <article className="retweet">
      <div className="retweet__aside">
        <div className="retweet__userImgBox">
          {/* <img className="retweet__userImg" src="" alt="" /> */}
        </div>
      </div>

      <div className="retweet__content">
        <div className="retweet__header">
          <div className="retweet__userInfo">
            <div>
              <RepeatOutlinedIcon
                sx={{ fontSize: '2.4rem', marginRight: '1rem' }}
              />
            </div>
            <div>
              <h4>
                {`${retweet.user.lastname[0].toUpperCase()}${retweet.user.lastname.slice(
                  1
                )} ${retweet.user.firstname[0].toUpperCase()}${retweet.user.firstname.slice(
                  1
                )} Retweeted`}
              </h4>
              <p>@{retweet.user.username}</p>
            </div>
            <div className="retweet__moreBox">
              <span>
                <button className="retweet__deleteBtn">Delete</button>
              </span>
              <span>
                <MoreHorizOutlinedIcon />
              </span>
            </div>
          </div>
        </div>

        <div className="retweet__tweet">
          <div className="tweet__header">
            <h4>
              <span className="tweet__author">
                {`${retweet.tweet.user.lastname[0].toUpperCase()}${retweet.tweet.user.lastname.slice(
                  1
                )} ${retweet.tweet.user.firstname[0].toUpperCase()}${retweet.tweet.user.firstname.slice(
                  1
                )}`}
              </span>
              <span>@{retweet.tweet.user.username}</span>
              <span>·</span>
              <time>{retweet.createdAt}18h</time>
            </h4>
          </div>

          <div className="tweet__content">
            {retweet.tweet?.text && <p>{retweet.tweet.text}</p>}
            {retweet.tweet?.upload && (
              <div className="tweet__upload">{retweet.tweet.upload}</div>
            )}
          </div>

          <div className="tweet__footer">
            <div>
              <ModeCommentOutlinedIcon />
              <p>Comment</p>
            </div>
            <div>
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
      </div>
    </article>
  );
};

export default ReTweet;
