import React, { useState, useEffect } from 'react';
import './ForgotPassword.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
// import useDocumentTitle from '../utils/useDocumentTitle';

import { forgotPassword, clearError } from '../../redux/auth/authSlice';

const ForgotPassword = () => {
  // useDocumentTitle(`Forgot your password`);
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error)
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
  }, [dispatch, error]);

  const handleForgotPassword = e => {
    e.preventDefault();
    if (email) dispatch(forgotPassword(email));
  };

  return (
    <main className="forgotPassword">
      <div className="forgotPassword__container">
        <div className="forgotPassword__header">
          <Link to="/">
            <TwitterIcon
              sx={{
                display: 'block',
                margin: '1rem auto',
                fontSize: '3.5rem',
                color: 'rgb(29, 155, 240)',
              }}
            />
          </Link>
          <Link to="/" className="forgotPassword__close">
            <CloseIcon sx={{ fontSize: '3rem', fontWeight: '600' }} />
          </Link>
          <h3>Forgot Your Password</h3>
        </div>

        <div className="forgotPassword__content">
          <form
            className="forgotPassword__form"
            onSubmit={handleForgotPassword}
          >
            <div className="forgotPassword__formControl">
              <label>Enter your account email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <div className="forgotPassword__error">
                <p className="forgotPassword__errorMessage">
                  Error: {error.message}
                </p>
              </div>
            )}

            <button type="submit">Send Reset Password</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgotPassword;
