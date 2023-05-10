import React from 'react';
import { useRoutes } from 'react-router-dom';
import Splash from './components/common/Splash';
import { RecoilRoot } from 'recoil';
import { SkeletonTheme } from 'react-loading-skeleton';
import { routes } from './router';
import { Common } from './styles/common';

const App = () => {
  const element = useRoutes(routes);
  return (
    <>
      <RecoilRoot>
        <SkeletonTheme
          baseColor={Common.colors.skeleton_base}
          highlightColor={Common.colors.skeleton_highlight}
        >
          {element}
        </SkeletonTheme>
      </RecoilRoot>
      <Splash />
    </>
  );
};

export default App;
