import React from 'react';
import './thank-you-header.css';

const ThankYouHeader = () => {
  return (
    <div className="thank-you-header__container">
      <img
        className="thank-you-header__photo"
        alt="Thank you for flying with us"
        src="/plane2.png"
      ></img>
    </div>
  );
};

export default ThankYouHeader;
