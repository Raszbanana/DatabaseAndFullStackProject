import React from 'react';
import './welcome-header.css';

const WelcomeHeader = () => {
  return (
    <div className="welcome-header__container">
      <img
        className="welcome-header__photo"
        alt="Welcome"
        src="/planeWithText.png"
      ></img>
    </div>
  );
};

export default WelcomeHeader;
