import React from 'react';

import HomeTabs from '../../ui/tabs/tabs';
import NewestOffers from '../../newest-offers/feature/newest-offers';

import './Home.css';

const Home = () => {
  return (
    <div className="home__container">
      <HomeTabs />
      <NewestOffers />
    </div>
  );
};
export default Home;
