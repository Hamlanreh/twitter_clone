import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import useDocumentTitle from '../utils/useDocumentTitle';

import Loading from '../Loading/Loading';

import { signup, clearError } from '../../redux/auth/authSlice';

const Signup = () => {
  useDocumentTitle('Sign up for Twitter');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, error } = useSelector(
    state => state.auth
  );
  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  });

  const monthsInAYear = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    if (isAuthenticated) return navigate('/home');
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    if (error)
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
  }, [dispatch, error]);

  const handleSignupForm = e => {
    e.preventDefault();
    if (
      !signupData.firstname ||
      !signupData.lastname ||
      !signupData.username ||
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.birthDay ||
      !signupData.birthMonth ||
      !signupData.birthYear
    )
      return;

    dispatch(
      signup({
        firstname: signupData.firstname,
        lastname: signupData.lastname,
        username: signupData.username,
        email: signupData.email,
        dob: `${signupData.birthDay}-${signupData.birthMonth}-${signupData.birthYear}`,
        password: signupData.password,
        confirmPassword: signupData.confirmPassword,
      })
    );
  };

  if (isLoading) return <Loading />;

  return (
    <main className="signup">
      <div className="signup__container">
        <div className="signup__header">
          <Link to="/" className="signup__closeBtn">
            <CloseIcon sx={{ fontSize: '3rem', fontWeight: '600' }} />
          </Link>
          <h3>Create your account</h3>
        </div>

        <div className="signup__formContainer">
          <form className="signup__form" onSubmit={handleSignupForm}>
            <div className="signup__formRow">
              <div>
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Firstname"
                  value={signupData.firstname}
                  onChange={e =>
                    setSignupData(state => ({
                      ...state,
                      firstname: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Lastname"
                  value={signupData.lastname}
                  onChange={e =>
                    setSignupData(state => ({
                      ...state,
                      lastname: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="signup__formControl">
              <label>Username</label>
              <input
                type="text"
                placeholder="Username"
                value={signupData.username}
                onChange={e =>
                  setSignupData(state => ({
                    ...state,
                    username: e.target.value,
                  }))
                }
              />
            </div>
            <div className="signup__formControl">
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={e =>
                  setSignupData(state => ({
                    ...state,
                    email: e.target.value,
                  }))
                }
              />
            </div>
            <div className="signup__formControl">
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={e =>
                  setSignupData(state => ({
                    ...state,
                    password: e.target.value,
                  }))
                }
              />
            </div>
            <div className="signup__formControl">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Password"
                value={signupData.confirmPassword}
                onChange={e =>
                  setSignupData(state => ({
                    ...state,
                    confirmPassword: e.target.value,
                  }))
                }
              />
            </div>

            <h4>Date of birth</h4>
            <p>
              This will not be shown publicly. Confirm your own age, even if
              this account is for a business, a pet, or something else.
            </p>

            <div className="signup__formDate">
              <span>
                <label>Month</label>
                <select
                  onChange={e =>
                    setSignupData(state => ({
                      ...state,
                      birthMonth: e.target.value,
                    }))
                  }
                >
                  {monthsInAYear.map((month, index) => (
                    <option key={index} value={index}>
                      {month}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label>Day</label>
                <select
                  onChange={e =>
                    setSignupData(state => ({
                      ...state,
                      birthDay: e.target.value,
                    }))
                  }
                >
                  {[...new Array(31)].map((_, index) => (
                    <option key={index} value={index}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </span>
              <span>
                <label>Year</label>
                <input
                  type="number"
                  step="1"
                  min="1970"
                  max={new Date().getFullYear()}
                  value={signupData.birthYear}
                  onChange={e =>
                    setSignupData(state => ({
                      ...state,
                      birthYear: e.target.value,
                    }))
                  }
                />
              </span>
            </div>

            {error && (
              <div className="signup__error">
                <p className="signup__errorMessage">Error: {error.message}</p>
              </div>
            )}

            <div className="signup__submitBox">
              <button className="signup__submitBtn" type="submit">
                Signup
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
