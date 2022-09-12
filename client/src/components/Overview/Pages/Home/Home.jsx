import React, { useEffect, useState } from 'react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';

import Loading from '../../../Loading/Loading';
import PostTweet from '../Tweet/PostTweet';
import Tweet from '../Tweet/Tweet';
import ReTweet from '../Tweet/ReTweet';

import { getTweetsAndRetweets } from '../../../../redux/home/homeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { isLoading: tweetIsLoading } = useSelector(state => state.tweet);
  const { isLoading: retweetIsLoading } = useSelector(state => state.retweet);
  const { isAuthenticated, isLoading: authIsLoading } = useSelector(
    state => state.auth
  );
  const { tweetsAndRetweets, isLoading: homeIsLoading } = useSelector(
    state => state.home
  );

  const handleScroll = e => {
    if (e.target.documentElement.scrollTop < 1) {
      setPage(page === 1 ? page : page - 1);
    } else if (
      e.target.documentElement.scrollTop + window.innerHeight >=
      e.target.documentElement.scrollHeight
    ) {
      setPage(tweetsAndRetweets.length > 1 ? page + 1 : page);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    dispatch(getTweetsAndRetweets(page));
  }, [dispatch, page, tweetIsLoading, retweetIsLoading]);

  if (authIsLoading || homeIsLoading || tweetIsLoading || retweetIsLoading)
    return <Loading />;

  return (
    <section className="home">
      <div className="home__header">
        <div>
          <span className="home__userImgBox">
            {/* <img className="home__userImg" src="" alt="" /> */}
          </span>
          <h1>Home</h1>
        </div>
        <AutoAwesomeOutlinedIcon
          sx={{ fontSize: '2rem', transform: 'rotate(180deg)' }}
        />
      </div>

      {isAuthenticated && <PostTweet />}

      <div className="home__tweetAndRetweets">
        {tweetsAndRetweets.length > 0 ? (
          tweetsAndRetweets.map(tweet =>
            tweet.isRetweet ? (
              <ReTweet key={tweet._id} retweet={tweet} />
            ) : (
              <Tweet key={tweet._id} tweet={tweet} />
            )
          )
        ) : (
          <div className="home__tweetsEmpty">
            <h4>Timeline is Empty...</h4>
          </div>
        )}
      </div>

      <div className="home__footer">
        <HomeRoundedIcon sx={{ fontSize: '3rem' }} />
        <SearchSharpIcon sx={{ fontSize: '3rem' }} />
        <WorkspacesOutlinedIcon sx={{ fontSize: '3rem' }} />
        <NotificationsNoneOutlinedIcon sx={{ fontSize: '3rem' }} />
        <MailOutlineRoundedIcon sx={{ fontSize: '3rem' }} />
      </div>
    </section>
  );
};

export default Home;
