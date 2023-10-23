import React from 'react';
import './flight-button.css';
import PropTypes from 'prop-types'; // Import prop-types

interface FlightButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset'; // Define a type prop
}

const FlightButton: React.FC<FlightButtonProps> = ({ onClick, children }) => {
  return (
    <button className="button-design" onClick={onClick}>
      {children}
    </button>
  );
};

FlightButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default FlightButton;
