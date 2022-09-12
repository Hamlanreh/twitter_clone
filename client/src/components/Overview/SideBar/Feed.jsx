import React from 'react';
import './Feed.css';

const Feed = () => {
  return (
    <article className="sidebar__feed">
      <div className="sidebar__feedLeft">
        <p>
          <span>Premier League</span>
          <span>·</span>
          <span>Yesterday</span>
        </p>
        <h3>Manchester United vs Liverpool FC</h3>
        <p>10.6K Tweets</p>
      </div>
      <div className="sidebar__feedRight">
        <div className="sidebar__feedImgBox">
          {/* <img className="sidebar__feedImg" src="" alt="" /> */}
        </div>
      </div>
    </article>
  );
};

export default Feed;
