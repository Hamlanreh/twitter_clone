import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Menu.css';
import { useDispatch, useSelector } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import Loading from '../../Loading/Loading';

import { logout } from '../../../redux/auth/authSlice';

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);

  const handleLogoutUser = e => {
    e.preventDefault();
    dispatch(logout());
    navigate('/'); // GOTO AUTH PAGE
  };

  if (isLoading) return <Loading />;

  return (
    <section className="menu">
      <nav className="nav">
        <Link to="/">
          <TwitterIcon sx={{ fontSize: '3rem', color: 'rgb(29, 155, 240)' }} />
        </Link>
        <Link to="/home">
          <HomeRoundedIcon sx={{ fontSize: '3rem' }} />
          <span>Home</span>
        </Link>
        <Link to="/home">
          <TagIcon sx={{ fontSize: '3rem' }} />
          <span>Explore</span>
        </Link>
        <Link to="/notification">
          <NotificationsNoneOutlinedIcon sx={{ fontSize: '3rem' }} />
          <span>Notifications</span>
        </Link>
        <Link to="/home">
          <MailOutlineRoundedIcon sx={{ fontSize: '3rem' }} />
          <span>Messages</span>
        </Link>
        <Link to="/bookmark">
          <BookmarkBorderOutlinedIcon sx={{ fontSize: '3rem' }} />
          <span>Bookmarks</span>
        </Link>
        <Link to="/home">
          <ListAltOutlinedIcon sx={{ fontSize: '3rem' }} />
          <span>List</span>
        </Link>
        <Link to="/profile">
          <PersonOutlineRoundedIcon sx={{ fontSize: '3rem' }} />
          <span>Profile</span>
        </Link>
        <Link to="/home">
          <MoreHorizOutlinedIcon sx={{ fontSize: '3rem' }} />
          <span>More</span>
        </Link>
        {isAuthenticated && (
          <Link to="/" onClick={handleLogoutUser}>
            <LogoutIcon sx={{ fontSize: '3rem' }} />
            <span>Logout</span>
          </Link>
        )}

        <button className="nav__tweetBtn">Tweet</button>
      </nav>

      {isAuthenticated && (
        <div className="menu__profile">
          <div className="menu__profileImgBox">
            {/* <img src="" alt="" className="menu__profileImg" /> */}
          </div>
          <div className="menu__profileUser">
            <h3>{`
                ${user.lastname[0].toUpperCase()}${user.lastname.slice(1)}
                ${user.firstname[0].toUpperCase()}${user.firstname.slice(1)}
              `}</h3>
            <p>@{user.username}</p>
          </div>
          <div className="menu__profileMore">
            <MoreHorizOutlinedIcon sx={{ fontSize: '2rem' }} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Menu;
