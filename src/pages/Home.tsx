import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import Header from '../components/section/home/Header';
import { Common } from '../styles/common';
import TabMenu from '../components/section/home/TabMenu';
import Feed from '../components/section/home/Feed';
import axiosRequest from '../api/axios';
import axios from 'axios';

const S = {
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};

const Home = () => {
  const [feedList, setFeedList] = useState([]);

  useEffect(() => {
    const response = axios.get('/feed');
    response
      .then((res) => setFeedList(res.data))
      .catch((err) => console.log(err));
  }, []);

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
