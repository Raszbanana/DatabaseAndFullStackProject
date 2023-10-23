import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FlightSearchForm from './flight-search/flight-search-form/feature/flight-search-form';
import FlightBooking from './pages/FlightBooking';
import NoPage from './pages/NoPage';

import './App.css';
function App() {
  return (
    <BrowserRouter>
    <div className='animated-background'>
      <div className='background-container'>
        <div className='App'>

      <Routes>
        <Route path="/" element={<FlightSearchForm />}>
        <Route path="/flight/:id" element={<FlightBooking />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
