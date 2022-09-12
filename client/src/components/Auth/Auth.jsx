import React, { useEffect } from 'react';
import './Auth.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import Loading from '../Loading/Loading';
// import useDocumentTitle from '../utils/useDocumentTitle';

import { getMe } from '../../redux/auth/authSlice';

const Auth = () => {
  // useDocumentTitle(`Twitter. It's what's happening`);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/home');
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) dispatch(getMe());
  }, [dispatch, isAuthenticated]);

  return (
    <section className="auth">
      <div className="auth__content">
        <div className="auth__left">
          <Link to="/home">
            <TwitterIcon
              sx={{
                color: 'rgb(255, 255, 255)',
                fontSize: '35rem',
                position: 'relative',
                top: '-5rem',
              }}
            />
          </Link>
        </div>

        <div className="auth__right">
          <div className="auth__rightContent">
            <Link to="/home">
              <TwitterIcon
                sx={{
                  color: 'rgb(29, 155, 240)',
                  fontSize: '5rem',
                  marginRight: '1rem',
                  marginBottom: '5rem',
                }}
              />
            </Link>
            <h1>Happening now</h1>
            <h2>Join Twitter today.</h2>
            <div className="auth__ctaBox">
              <button className="auth__btn">
                <GoogleIcon sx={{ marginRight: '1rem' }} />
                <span>Sign up with Google</span>
              </button>
              <button className="auth__btn">
                <AppleIcon sx={{ marginRight: '1rem' }} />
                <span>Sign up with Apple</span>
              </button>
              <p>or</p>
              <Link to="/signup" className="auth__btn">
                Sign up with phone or email
              </Link>
            </div>
            <p>
              By signing up, you agree to the Terms of Service and Privacy
              Policy, including Cookie Use.
            </p>
            <h3>Already have an account?</h3>
            <Link to="/login" className="auth__signInBtn">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="auth__footer">
        <ul>
          <li>About</li>
          <li>Help Center</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Cookie Policy</li>
          <li>Accessibility</li>
          <li>Ads info</li>
          <li>Blog</li>
          <li>Status</li>
          <li>Careers</li>
          <li>Brand Resources</li>
          <li>Advertising</li>
          <li>Marketing</li>
          <li>Twitter for Business</li>
          <li>Developers</li>
          <li>Directory</li>
          <li>Settings</li>
          <li>&copy; 2022 Twitter, Inc.</li>
        </ul>
      </div>

      {isLoading ? <Loading /> : <Outlet />}
    </section>
  );
};

export default Auth;
