import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import FlightBookingPage from './pages/FlightBookingPage';
import NoPage from './pages/NoPage';
import Home from './pages/Home/Home';

import './App.css';
import Navbar from './ui/navbar/navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/flight/:id',
      element: <FlightBookingPage />,
    },
    {
      path: '*',
      element: <NoPage />,
    },
  ]);

  return (
    <div className="animated-background">
      <div className="background-container">
        <div className="App">
          <Navbar></Navbar>
          <div className="page">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
