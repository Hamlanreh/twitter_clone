import React from 'react';
import './Overview.css';

import Menu from './Menu/Menu';
import SideBar from './SideBar/SideBar';

const Overview = ({ children }) => { 
  return (
    <div className="overview">
      <Menu />
      <div className="overview__content">{children}</div>
      <SideBar />
    </div>
  );
};

export default Overview;
