import React from 'react';
import './Comment.css';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded';

const Comment = () => {
  return (
    <article className="comment">
      <div className="comment__userImgBox">
        {/* <img src="" alt="" className="userImg" /> */}
      </div>
      <div className="comment__content">
        <div className="comment__user">
          <span>
            <h4>Elon Musk</h4>
          </span>
          <span>
            <p>@elonmusk</p>
          </span>
          <span>·</span>
          <span>
            <time>15h</time>
          </span>
        </div>
        <p>Replying to @elonmusk</p>
        <p className="comment__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          ipsum ipsa expedita aspernatur iste mollitia accusamus fugiat vero
          autem eius.
        </p>
        <ul className="comment__detail">
          <li>
            <ModeCommentOutlinedIcon sx={{ fontSize: '2rem' }} />
            <span>0</span>
          </li>
          <li>
            <RepeatOutlinedIcon sx={{ fontSize: '2rem' }} />
            <span>0</span>
          </li>
          <li>
            <FavoriteBorderOutlinedIcon sx={{ fontSize: '2rem' }} />
            <span>0</span>
          </li>
          <li>
            <IosShareRoundedIcon sx={{ fontSize: '2rem' }} />
            <span>0</span>
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Comment;
