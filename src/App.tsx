import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import MyPost from './pages/MyPost';
import Profile from './pages/Profile';
import NoMatch from './components/common/NoMatch';
import { useMobileCheck, isMobile } from './hooks/useMobile';
import OnBoarding from './components/common/OnBoarding';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Join from './pages/Join';
import Location from './pages/Location';
import MobileGuide from './components/common/MobileGuide';
import LocationSearch from './pages/LocationSearch';
import { RecoilRoot } from 'recoil';
import PostView from './pages/PostView';
import Upload from './pages/Upload';
import { FeedCategory } from './context/FeedCategory';
import { SkeletonTheme } from 'react-loading-skeleton';
import HomeGuest from './pages/HomeGuest';

interface IProp {
  isCategory: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const App = () => {
  if (import.meta.env.MODE === 'production') {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }
  // router
  const routes: RouteObject[] = [
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
  const element = useRoutes(routes);
  const location = useLocation();
  const [isCategory, setCategory] = useState<string>('all');

  const [isShow, setShow] = useState<boolean>(true);
  useEffect(() => {
    if (isMobile()) {
      setTimeout(() => setShow(false), 2000);
    } else {
      setShow(false);
    }
  });

  return (
    <>
      <div className='App'>
        <SkeletonTheme baseColor='#D3D3DB' highlightColor='#e8e8f0'>
          <FeedCategory.Provider value={{ isCategory, setCategory } as IProp}>
            <RecoilRoot>
              {useMobileCheck() ? element : <MobileGuide />}
            </RecoilRoot>
          </FeedCategory.Provider>
        </SkeletonTheme>
      </div>
      {location.pathname === '/' && <OnBoarding isShow={isShow} />}
    </>
  );
};

export default App;
