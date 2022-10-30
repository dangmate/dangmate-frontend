import React, { useEffect, useState } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Story from './pages/Story';
import Profile from './pages/Profile';
import NoMatch from './components/common/NoMatch';
import { useMobileCheck, isMobile } from './hooks/useMobile';
import OnBoarding from './pages/OnBoarding';
import Login1 from './pages/Login-1';
import Join from './pages/Join';
import Login from './pages/Login';

const App = () => {
  // router
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Login1 /> },
        { path: 'home', element: <Home /> },
        { path: 'join', element: <Join /> },
        { path: 'login', element: <Login /> },
        { path: 'favorite', element: <Favorite /> },
        { path: 'story', element: <Story /> },
        { path: 'profile', element: <Profile /> },
        { path: '*', element: <NoMatch /> }
      ]
    }
  ];
  const element = useRoutes(routes);

  const [isShow, setShow] = useState<boolean>(true);
  useEffect(() => {
    if (isMobile()) {
      setTimeout(() => setShow(false), 1000);
    } else {
      setShow(false);
    }
  });

  return (
    <>
      <div className='App'>{useMobileCheck() ? element : mobileGuide()}</div>
      {isShow && <OnBoarding />}
    </>
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
