import React from 'react';
import './Loading.css';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className="loading">
      <CircularProgress
        sx={{ color: 'rgb(29, 155, 240)', fontSize: '70px', fontWeight: '800' }}
      />
    </div>
  );
};

export default Loading;
