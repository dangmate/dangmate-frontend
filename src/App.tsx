import React, { useEffect, useState } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Story from './pages/Story';
import Profile from './pages/Profile';
import NoMatch from './components/common/NoMatch';
import { useMobileCheck } from './hooks/useMobile';
const App = () => {
  // router
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'favorite', element: <Favorite /> },
        { path: 'story', element: <Story /> },
        { path: 'profile', element: <Profile /> },
        { path: '*', element: <NoMatch /> }
      ]
    }
  ];
  const element = useRoutes(routes);

  return (
    <div className='App'>{useMobileCheck() ? element : mobileGuide()}</div>
  );
};

const mobileGuide = () => {
  return (
    <>
      <h2>모바일에 최적화된 서비스입니다.</h2>
    </>
  );
};

export default App;
