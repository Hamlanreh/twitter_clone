import React from 'react';
import './Notification.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Notification = () => {
  return (
    <main className="notification">
      <div className="notification__header">
        <ArrowBackIcon sx={{ fontSize: '2rem' }} />
        <div>
          <h4>Notifications</h4>
        </div>
      </div>

      <ul className="notification__nav">
        <li className="notification__navItem notification__navItem--active">
          All
        </li>
        <li className="notification__navItem">Mentions</li>
      </ul>
    </main>
  );
};

export default Notification;
