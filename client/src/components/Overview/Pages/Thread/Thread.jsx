import React from 'react';
import './Thread.css';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

import Comment from '../Comment/Comment';

const Thread = () => {
  return (
    <main className="thread">
      <div className="thread__header">
        <ArrowBackIcon sx={{ fontSize: '2rem' }} />
        <div>
          <h4>Thread</h4>
        </div>
      </div>

      <div className="thread__postContainer">
        <div className="thread__user">
          <div className="thread__userImgBox">
            {/* <img src="" alt="" className="thread__userImg" /> */}
          </div>
          <div>
            <h1>Oluwabi Ahmed</h1>
            <p>@Hamlanreh</p>
          </div>
          <div className="thread__moreToggleBtn">
            <MoreHorizOutlinedIcon sx={{ fontSize: '2rem' }} />
          </div>
        </div>
        <p className="thread__post">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          aliquam eaque velit molestiae reiciendis! Quaerat dolorum id
          architecto accusamus in libero, hic magni incidunt? Libero nesciunt
          eligendi, facilis officiis inventore, deserunt quaerat necessitatibus
          sequi tempore totam ex ipsa atque soluta temporibus mollitia hic,
          animi odit sed? Sed cumque dolor voluptatum ut sequi.
        </p>
        <p className="thread__postDate">
          <span>7:01 PM</span>
          <span>·</span>
          <span>Sept 5, 2022</span>
          <span>·</span>
          <span>Twitter for IPhone</span>
        </p>
        <p className="thread__postDetail">
          <span>
            <strong>16.1K</strong> Retweets
          </span>
          <span>
            <strong>4,298</strong> Quote Tweets
          </span>
          <span>
            <strong>155.5K</strong> Likes
          </span>
        </p>

        <ul className="thread__postActionList">
          <li>
            <ModeCommentOutlinedIcon sx={{ fontSize: '2.5rem' }} />
          </li>
          <li>
            <RepeatOutlinedIcon sx={{ fontSize: '2.5rem' }} />
          </li>
          <li>
            <FavoriteBorderOutlinedIcon sx={{ fontSize: '2.5rem' }} />
          </li>
          <li>
            <IosShareRoundedIcon sx={{ fontSize: '2.5rem' }} />
          </li>
        </ul>
      </div>

      <div className="thread__replyFormBox">
        <p>Replying to @hamlanreh</p>
        <div>
          <div className="thread__replyImgBox">
            {/* <img src="" alt="" className="thread__replyImg" /> */}
          </div>
          <form className="thread__replyForm">
            <textarea placeholder="Tweet your reply" maxLength={180}></textarea>
            <button type="submit">Reply</button>
          </form>
        </div>
      </div>

      <div className="thread__replyContainer">
        <Comment />
        <Comment />
        <Comment />
      </div>
    </main>
  );
};

export default Thread;
