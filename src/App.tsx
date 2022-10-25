import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Story from './pages/Story';
import Profile from './pages/Profile';
import NoMatch from './components/common/NoMatch';

const App = () => {
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

  return <div className='App'>{element}</div>;
};

export default App;
