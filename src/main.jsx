import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Root from './routes/root';
import Journal from './routes/journal';
import Coffees from './routes/coffees';
import Analytics from './routes/analytics';
import Login from './routes/login';
import Brew from './routes/brew';
import { Auth0Provider } from '@auth0/auth0-react';
import './styles.css';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Login />,
      },
      {
        path: 'journal',
        element: <Journal />,
      },
      {
        path: 'coffees',
        element: <Coffees />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'brew/:coffeeId',
        element: <Brew />,
        loader: async ({ req, params }) => {
          return;
        },
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-1mdmd8kt.us.auth0.com'
      clientId='pBxKETHM7pJXd5lwxnKhLHP6quFS9mm1'
      redirectUri={window.location.origin + '/coffees'}
      audience="Coffee"
      scope='read:coffees'>
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
