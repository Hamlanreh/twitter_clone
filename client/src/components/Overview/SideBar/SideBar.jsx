import React from 'react';
import './SideBar.css';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import Feed from './Feed';
import Follow from './Follow';

const SideBar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <form className="sidebarForm">
          <label className="sidebarForm__label" htmlFor="sidebarForm__label">
            <button className="sidebarForm__button" type="submit">
              <SearchSharpIcon sx={{ fontSize: '2rem' }} />
            </button>
            <input
              type="text"
              placeholder="Search Twitter"
              id="sidebarForm__input"
              className="sidebarForm__input"
            />
          </label>
        </form>
      </div>

      <div className="sidebar__container">
        <div className="sidebar__feeds">
          <h2>What's happening</h2>
          <Feed />
          <Feed />
          <Feed />
        </div>

        <div className="sidebar__feeds">
          <h2>Who to follow</h2>
          <Follow />
          <Follow />
          <Follow />
        </div>

        <div className="sidebar__footer">
          <ul>
            <li>Terms of Service</li>
            <li> Privacy Policy</li>
            <li> Cookie Policy</li>
            <li> Accessibility</li>
            <li>Ads info</li>
            <li>More ...</li>
            <li>© 2022 Twitter, Inc.</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
