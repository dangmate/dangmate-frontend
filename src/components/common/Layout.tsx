import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../store/user';
import { guestState } from '../../store/guest';
import { removeConsole } from '../../utils/removeConsole';
import { useMobileCheck } from '../../hooks/useMobile';
import MobileGuide from './MobileGuide';

const Layout = () => {
  const userData = useRecoilValue(userState);
  const setGuest = useSetRecoilState(guestState);
  useEffect(() => {
    removeConsole();
  }, []);
  useEffect(() => {
    if (userData.fullName && userData.email && userData.location) {
      setGuest(false);
    } else {
      setGuest(true);
    }
  }, [userData]);
  return <>{useMobileCheck() ? <Outlet /> : <MobileGuide />}</>;
};

export default Layout;
