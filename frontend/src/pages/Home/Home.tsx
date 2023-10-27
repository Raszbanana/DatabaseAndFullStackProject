import React from 'react';

import HomeTabs from '../../ui/tabs/tabs';
import NewestOffers from '../../newest-offers/feature/newest-offers';
import WelcomeHeader from '../../ui/welcome-header/welcome-header';

import './Home.css';

const Home = () => {
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
