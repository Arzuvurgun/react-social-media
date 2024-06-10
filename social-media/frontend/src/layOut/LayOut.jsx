import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// Pages
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import Signup from '../pages/signup/Signup';
import Login from '../pages/login/Login';
import MessagePage from '../pages/message/MessagePage';
import MessageBox from '../pages/message/MessageBox';
import Verify from '../pages/signup/Verify';



export default function LayOut() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/profile',
      element: <Profile />
    },

    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/messagePage',
      element: <MessagePage />
    },
    {
      path: '/messageBox',
      element: <MessageBox />
    },
    {
      path: '/verify/:uuid',
      element: <Verify />
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


