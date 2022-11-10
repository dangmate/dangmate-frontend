import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import Header from '../components/section/home/Header';
import { Common } from '../styles/common';
import TabMenu from '../components/section/home/TabMenu';
import Feed from '../components/section/home/Feed';

const S = {
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};

const Home = () => {
  return (
    <>
      <Header />
      <TabMenu />
      <S.FeedList>
        <Feed />
      </S.FeedList>
    </>
  );
};

export default Home;
