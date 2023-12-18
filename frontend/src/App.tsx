import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

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
      path: '/book-flight',
      element: <FlightBookingPage />,
    },
    {
      path: '*',
      element: <NoPage />,
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="background-container">
        <div className="App">
          <Navbar></Navbar>
          <div className="page">
            <RouterProvider router={router} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
