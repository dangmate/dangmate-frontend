import { RouteObject } from 'react-router-dom';
import Layout from './components/common/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Join from './pages/Join';
import Location from './pages/Location';
import LocationSearch from './pages/LocationSearch';
import Home from './pages/Home';
import HomeGuest from './pages/HomeGuest';
import PostView from './pages/PostView';
import Upload from './pages/Upload';
import Favorite from './pages/Favorite';
import MyPost from './pages/MyPost';
import Profile from './pages/Profile';
import NoMatch from './components/common/NoMatch';
import React from 'react';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <Login /> },
      { path: 'join', element: <Join /> },
      { path: 'location', element: <Location /> },
      { path: 'location-search', element: <LocationSearch /> },
      { path: 'home', element: <Home /> },
      { path: 'feed', element: <HomeGuest /> },
      { path: 'view/:postId', element: <PostView /> },
      { path: 'upload', element: <Upload /> },
      { path: 'upload/:postId', element: <Upload /> },
      { path: 'favorite', element: <Favorite /> },
      { path: 'mypost', element: <MyPost /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NoMatch /> }
    ]
  }
];
