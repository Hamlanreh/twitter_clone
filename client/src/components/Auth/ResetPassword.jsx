import React, { useState, useEffect } from 'react';
import './ResetPassword.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import TwitterIcon from '@mui/icons-material/Twitter';
// import useDocumentTitle from '../utils/useDocumentTitle';

import { resetPassword, clearError } from '../../redux/auth/authSlice';

const ResetPassword = () => {
  // useDocumentTitle(`Reset your password`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();

  const { error } = useSelector(state => state.auth);
  const [resetData, setResetData] = useState({
    token: token,
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (error)
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
  }, [dispatch, error]);

  const handleResetPassword = e => {
    e.preventDefault();
    if (!resetData.token || !resetData.password || !resetData.confirmPassword)
      return;
    dispatch(resetPassword(resetData));
    navigate('/login');
  };

  return (
    <main className="resetPassword">
      <div className="resetPassword__container">
        <div className="resetPassword__header">
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
          <Link to="/" className="resetPassword__closeBtn">
            <CloseIcon sx={{ fontSize: '3rem', fontWeight: '600' }} />
          </Link>
          <h3>Reset Your Password</h3>
        </div>

        <div className="resetPassword__content">
          <form className="resetPassword__form" onSubmit={handleResetPassword}>
            <div className="resetPassword__formControl">
              <label>Enter your new password</label>
              <input
                type="password"
                placeholder="Password"
                value={resetData.password}
                onChange={e =>
                  setResetData({ ...resetData, password: e.target.value })
                }
              />
            </div>
            <div className="resetPassword__formControl">
              <label>Confirm your password</label>
              <input
                type="password"
                placeholder="Password"
                value={resetData.confirmPassword}
                onChange={e =>
                  setResetData({
                    ...resetData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            {error && (
              <div className="resetPassword__error">
                <p className="resetPassword__errorMessage">
                  Error: {error.message}
                </p>
              </div>
            )}

            <button type="submit">Change Password</button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
