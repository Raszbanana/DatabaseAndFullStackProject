import React from 'react';
import './welcome-header.css';

const WelcomeHeader = () => {
  return (
    <div className="welcome-header__container">
      <img
        className="welcome-header__photo"
        alt="Welcome"
        src="/planeWithText.png"
        height="250px"
        width="100%"
      ></img>
    </div>
  );
};

export default WelcomeHeader;
