import React, { useEffect } from 'react';
import './Profile.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import LocationOnOutlinedGpsFixedIcons from '@mui/icons-material/LocationOnOutlined';

import Loading from '../../../Loading/Loading';

const Profile = () => {
  const navigate = useNavigate();

  const {
    isAuthenticated,
    user,
    isLoading: authIsLoading,
  } = useSelector(state => state.auth);

  useEffect(() => {
    if (!isAuthenticated) navigate('/home');
  }, [navigate, isAuthenticated]);

  if (authIsLoading) return <Loading />;

  return (
    <main className="profile">
      <div className="profile__header">
        <Link to="/home">
          <ArrowBackIcon sx={{ fontSize: '2rem' }} />
        </Link>
        <div>
          <h4>
            {`${user.lastname[0].toUpperCase()}${user.lastname.slice(
              1
            )} ${user.firstname[0].toUpperCase()}${user.firstname.slice(1)}`}
          </h4>
          <p>38 Tweets</p>
        </div>
      </div>

      <div className="profile__container">
        <div className="profile__userBgImgBox">
          {/* <img src="" alt="" className="profile__userBgImg" /> */}
        </div>
        <div className="profile__userImgBox">
          {/* <img src="" alt="" className="profile__userImg" /> */}
        </div>
        <div className="profile__userDetail">
          <h1>{`${user.lastname[0].toUpperCase()}${user.lastname.slice(
            1
          )} ${user.firstname[0].toUpperCase()}${user.firstname.slice(1)}`}</h1>
          <p>@{user.username}</p>
          <p className="profile__userLocation">
            <span>
              <LocationOnOutlinedGpsFixedIcons
                sx={{ fontSize: '1.7rem', marginRight: '1rem' }}
              />
              Lagos
            </span>
            <span>
              <CalendarMonthRoundedIcon
                sx={{ fontSize: '1.7rem', marginRight: '1rem' }}
              />
              Joined &nbsp;
              <Moment format="MMM YYY" withTitle>
                {user.createdAt}
              </Moment>
            </span>
          </p>
          <p className="profile__userFollowing">
            <span>
              <strong>52</strong> Following
            </span>
            <span>
              <strong>7</strong> Followers
            </span>
          </p>
        </div>
        <nav className="profile__nav">
          <a className="profile__navLink profile__navLink--active" href="/">
            Tweets
          </a>
          <a className="profile__navLink" href="/">
            Tweets &amp; replies
          </a>
          <a className="profile__navLink" href="/">
            Media
          </a>
          <a className="profile__navLink" href="/">
            Likes
          </a>
        </nav>

        <div className="profile__content"></div>
      </div>
    </main>
  );
};

export default Profile;
