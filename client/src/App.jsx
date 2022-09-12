import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';

import Home from './components/Overview/Pages/Home/Home';
import Profile from './components/Overview/Pages/Profile/Profile';
import Bookmarks from './components/Overview/Pages/Bookmarks/Bookmarks';
// import Thread from './components/Overview/Pages/Thread/Thread';
import Notification from './components/Overview/Pages/Notification/Notification';

import Overview from './components/Overview/Overview';
// import NotFound from './components/NotFound/NotFound';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>

          <Route
            path="/home"
            element={
              <Overview>
                <Home />
              </Overview>
            }
          />

          <Route
            path="/profile"
            element={
              <Overview>
                <Profile />
              </Overview>
            }
          />

          <Route
            path="/bookmark"
            element={
              <Overview>
                <Bookmarks />
              </Overview>
            }
          />

          {/* <Route
            path="/thread"
            element={
              <Overview>
                <Thread />
              </Overview>
            }
          /> */}

          <Route
            path="/notification"
            element={
              <Overview>
                <Notification />
              </Overview>
            }
          />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
