import React from 'react';
import './Follow.css';

const Follow = () => {
  return (
    <article className="sidebar__follow">
      <div className="sidebar__followImgBox">
        {/* <img className="sidebar__feedImg" src="" alt="" /> */}
      </div>
      <div className="sidebar__followUser">
        <h3>Kamaru Usman</h3>
        <p>@USMAN84kg</p>
      </div>
      <div className="sidebar__followBtnBox">
        <button>Follow</button>
      </div>
    </article>
  );
};

export default Follow;
