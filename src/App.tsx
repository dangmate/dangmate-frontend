import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { RouteObject, useLocation, useRoutes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Story from './pages/Story';
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
import { Common } from './styles/common';

interface IProp {
  isCategory: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const App = () => {
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
        { path: 'view/:postId', element: <PostView /> },
        { path: 'upload', element: <Upload /> },
        { path: 'upload/:postId', element: <Upload /> },
        { path: 'favorite', element: <Favorite /> },
        { path: 'story', element: <Story /> },
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
      setTimeout(() => setShow(false), 1000);
    } else {
      setShow(false);
    }
  });

  return (
    <>
      <div className='App'>
        <SkeletonTheme
          baseColor={Common.colors.grey_disabled}
          highlightColor='#c7c7c7'
        >
          <FeedCategory.Provider value={{ isCategory, setCategory } as IProp}>
            <RecoilRoot>
              {useMobileCheck() ? element : <MobileGuide />}
            </RecoilRoot>
          </FeedCategory.Provider>
        </SkeletonTheme>
      </div>
      {location.pathname === '/' && isShow && <OnBoarding />}
    </>
  );
};

export default App;
