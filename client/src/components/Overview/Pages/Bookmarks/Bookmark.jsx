import React, { useState } from 'react';
import './Bookmark.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import { deleteBookmark } from '../../../../redux/bookmark/bookmarkSlice';

const Bookmark = ({ bookmark }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  const handleDeleteBookmark = (tweetId, bookmarkId) => {
    dispatch(deleteBookmark({ tweetId, bookmarkId }));
    navigate('/bookmark');
  };

  return (
    <div className="bookmark">
      <div className="bookmark__user">
        <div className="bookmark__userImgBox"></div>
      </div>
      <div className="bookmark__content">
        <div className="bookmark__header">
          <h4>
            <span className="bookmark__author">
              {`
                ${bookmark.user.lastname[0].toUpperCase()}${bookmark.user.lastname.slice(
                1
              )} ${bookmark.user.firstname[0].toUpperCase()}${bookmark.user.firstname.slice(
                1
              )}
              `}
            </span>
            <span>@{bookmark.user.username}</span>
            <span>·</span>
            <time>
              <Moment fromNow ago>
                {new Date(bookmark.createdAt).getTime()}
              </Moment>
            </time>
          </h4>

          <div className="bookmark__moreBox">
            <span className="bookmark__moreListBox">
              <MoreHorizOutlinedIcon onClick={() => setShowMore(!showMore)} />
              {showMore && (
                <ul className="bookmark__moreList">
                  <li
                    className="bookmark__moreItem"
                    onClick={() =>
                      handleDeleteBookmark(bookmark.tweet._id, bookmark._id)
                    }
                  >
                    <BookmarkBorderOutlinedIcon
                      sx={{
                        marginRight: '1rem',
                        fontSize: '2rem',
                        color: '#fff',
                      }}
                    />
                    Remove Bookmark
                  </li>
                </ul>
              )}
            </span>
          </div>
        </div>

        <div className="bookmark__content">
          {bookmark.tweet?.text && <p>{bookmark.tweet.text}</p>}
          {bookmark.tweet?.upload && (
            <div className="bookmark__upload">{bookmark.tweet?.upload}</div>
          )}
        </div>

        <div className="bookmark__footer">
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
  );
};

export default Bookmark;
