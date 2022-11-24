import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../store/user';
import { guestState } from '../../store/guest';

const Layout = () => {
  const userData = useRecoilValue(userState);
  const setGuest = useSetRecoilState(guestState);
  useEffect(() => {
    if (userData.fullName && userData.email && userData.location) {
      setGuest(false);
      console.log('guestmode : false');
    } else {
      setGuest(true);
      console.log('guestmode : true');
    }
  }, [userData]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
