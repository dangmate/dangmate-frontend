import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { deemState } from '../../store/deem';

// const Nav = styled.nav`
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   padding-bottom: 3vw;
//   & > ul {
//     display: flex;
//     justify-content: space-around;
//   }
// `;
const S = {};

const Layout = () => {
  return (
    <div>
      {/*<div>*/}
      {/*  <Link to={'/'}>멍메이트</Link>*/}
      {/*</div>*/}

      <Outlet />
      {/*<Nav>*/}
      {/*  <ul>*/}
      {/*    <li>*/}
      {/*      <Link to={'/home'}>홈</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={'/favorite'}>관심목록</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={'/story'}>내가 쓴 글</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to={'/profile'}>프로필</Link>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</Nav>*/}
    </div>
  );
};

export default Layout;
