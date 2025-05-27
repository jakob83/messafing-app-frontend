import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import Chat from './Chat/Chat.jsx';
import Users from './Users/Users.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/:contactId',
        element: <Chat />,
      },
    ],
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/settings',
    element: <div>In develpoment...</div>,
  },
  {
    path: '/profile',
    element: <div>In develpoment...</div>,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
