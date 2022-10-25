import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div>
        <Link to={'/'}>멍메이트</Link>
      </div>
      <Outlet />
      <nav>
        <ul>
          <li>
            <Link to={'/'}>홈</Link>
          </li>
          <li>
            <Link to={'/favorite'}>관심목록</Link>
          </li>
          <li>
            <Link to={'/story'}>내가 쓴 글</Link>
          </li>
          <li>
            <Link to={'/profile'}>프로필</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
