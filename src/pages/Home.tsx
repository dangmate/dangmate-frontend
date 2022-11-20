import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeHeader from '../components/section/home/HomeHeader';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import PostCard from '../components/section/home/PostCard';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import PostEmpty from '../components/section/home/PostEmpty';
import { FeedCategory } from '../context/FeedCategory';
import ButtonWrite from '../components/asset/ButtonWrite';
import NaviBar from '../components/asset/NaviBar';

const S = {
  Container: styled.div`
    position: relative;
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};

const Home = () => {
  const [feed, setFeed] = useState([]);
  const userData = useRecoilValue(userState);
  const categoryContext = useContext(FeedCategory);

  const fetchPosts = async (category: string) => {
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    try {
      const response = await axiosRequest().post(
        '/api/posts?size=10&lastPostId=30',
        data
      );
      console.log(response.data);
      setFeed(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts(categoryContext.isCategory);
  }, []);

  return (
    <>
      <S.Container>
        {/* Header */}
        <HomeHeader />

        {/* TabMenu */}
        <HomeTabMenu fetchPosts={fetchPosts} />

        {/* FeedList */}
        <S.FeedList>
          {feed ? (
            feed.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <PostCard data={item} />
                </React.Fragment>
              );
            })
          ) : (
            <PostEmpty />
          )}
        </S.FeedList>

        {/* Write Button */}
        <ButtonWrite />

        {/* Home Navibar */}
        <NaviBar />
      </S.Container>
    </>
  );
};

export default Home;
