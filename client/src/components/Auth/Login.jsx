import React, { useEffect, useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import CloseIcon from '@mui/icons-material/Close';
// import useDocumentTitle from '../utils/useDocumentTitle';

import { login, clearError } from '../../redux/auth/authSlice';

const Login = () => {
  // useDocumentTitle('Log in to your Twitter');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (error)
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
  }, [dispatch, error]);

  const handleLoginForm = e => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) return;
    dispatch(login(loginData));
  };

  return (
    <main className="login">
      <div className="login__container">
        <div className="login__header">
          <Link to="/" className="login__close">
            <CloseIcon sx={{ fontSize: '3rem', fontWeight: '600' }} />
          </Link>
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
          <h3>Sign in to Twitter</h3>
        </div>

        <div className="login__ctaContainer">
          <div className="login__ctaBox">
            <button className="login__btn">
              <GoogleIcon sx={{ marginRight: '1rem' }} />
              <span>Sign up with Google</span>
            </button>
            <button className="login__btn">
              <AppleIcon sx={{ marginRight: '1rem' }} />
              <span>Sign up with Apple</span>
            </button>

            <p className="login__lineBreak">or</p>

            <form className="login__form" onSubmit={handleLoginForm}>
              <div className="login__formControl">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Email"
                  value={loginData.email}
                  onChange={e =>
                    setLoginData(state => ({ ...state, email: e.target.value }))
                  }
                />
              </div>
              <div className="login__formControl">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={e =>
                    setLoginData(state => ({
                      ...state,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              {error && (
                <div className="login__error">
                  <p className="login__errorMessage">Error: {error.message}</p>
                </div>
              )}

              <button type="submit">Sign in</button>
            </form>

            <Link to="/forgot-password" className="login__forgotBtn">
              Forgot password?
            </Link>

            <p className="login__info">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
