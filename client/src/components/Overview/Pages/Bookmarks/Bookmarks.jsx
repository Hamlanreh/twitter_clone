import React, { useEffect, useState } from 'react';
import './Bookmarks.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Loading from '../../../Loading/Loading';
import Bookmark from './Bookmark';

import { getMyBookmarks } from '../../../../redux/bookmark/bookmarkSlice';

const Bookmarks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { bookmarks, isLoading: bookmarkIsLoading } = useSelector(
    state => state.bookmark
  );

  const handleScroll = e => {
    if (e.target.documentElement.scrollTop < 1) {
      setPage(page === 1 ? page : page - 1);
    } else if (
      e.target.documentElement.scrollTop + window.innerHeight >=
      e.target.documentElement.scrollHeight
    ) {
      setPage(bookmarks.length > 1 ? page + 1 : page);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    if (!isAuthenticated) navigate('/home');
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    dispatch(getMyBookmarks({ userId: user._id, page }));
  }, [dispatch, user, page]);

  if (bookmarkIsLoading) return <Loading />;

  return (
    <main className="bookmarks">
      <div className="bookmarks__header">
        <Link to="/home">
          <ArrowBackIcon sx={{ fontSize: '2rem' }} />
        </Link>
        <div>
          <h4>Bookmarks</h4>
          <p>@{user.username}</p>
        </div>
      </div>

      <div className="bookmarks__container">
        {bookmarks.length > 0 ? (
          bookmarks.map(bookmark => (
            <Bookmark key={bookmark._id} bookmark={bookmark} />
          ))
        ) : (
          <div className="bookmarks__empty">
            <h4>Your Bookmark is Empty...</h4>
          </div>
        )}
      </div>
    </main>
  );
};

export default Bookmarks;
