import React, { useEffect } from 'react';

import HomeTabs from '../../ui/tabs/tabs';
import NewestOffers from '../../newest-offers/feature/newest-offers';
import WelcomeHeader from '../../ui/welcome-header/welcome-header';

import './Home.css';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

const clearAllStates = (dispatch: Dispatch) => {
  dispatch({ type: 'CLEAR_STEPS' });
  dispatch({ type: 'CLEAR_SEATS' });
  dispatch({ type: 'CLEAR_FLIGHTS_SEARCH_PARAMS' });
  dispatch({ type: 'CLEAR_PASSENGERS_DETAILS' });
  dispatch({ type: 'CLEAR_TRIP' });
};

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    clearAllStates(dispatch);
  }, [dispatch]);

  return (
    <div className="home__container">
      <HomeTabs />
      <div className="welcome-header">
        <WelcomeHeader />
      </div>
      <NewestOffers />
    </div>
  );
};
export default Home;
