import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Root from './routes/root';
import Journal from './routes/journal';
import Coffees from './routes/coffees';
import Analytics from './routes/analytics';
import Login from './routes/login';
import Brew from './routes/brew';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
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
    <RouterProvider router={router} />
  </React.StrictMode>
);
