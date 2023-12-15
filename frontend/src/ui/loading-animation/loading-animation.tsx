import React from 'react';
import FlightIcon from '@mui/icons-material/Flight';
import './loading-animation.css';

interface LoadingAnimationProps {}

const LoadingAnimation: React.FC<LoadingAnimationProps> = () => {
  return (
    <div className="full-screen-overlay">
      <div className="loading">
        <div className="plane">
          <FlightIcon name="airplane-sharp" />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
