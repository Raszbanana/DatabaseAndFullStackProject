import React from 'react';
import FlightSearchForm from './flight-search/flight-search-form/feature/flight-search-form';
import './App.css';
function App() {
  return (
    <div className='animated-background'>
      <div className='background-container'>
        <div className='App'>
          <FlightSearchForm />
        </div>
      </div>
    </div>
  );
}

export default App;
