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
import { CardType } from '../api/type';
import Loader from '../components/asset/Loader';
import CardSkeleton from '../components/section/home/CardSkeleton';

const S = {
  Container: styled.div`
    position: relative;
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};

const PAGE_NUMBER = 27;

const Home = () => {
  const userData = useRecoilValue(userState);
  const [feed, setFeed] = useState<CardType[]>([]);
  const categoryContext = useContext(FeedCategory);

  // infinite scroll
  const [page, setPage] = useState(PAGE_NUMBER);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (category: string) => {
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    try {
      const response = await axiosRequest().post(
        `/api/posts?size=5&lastPostId=${page}`,
        data
      );
      console.log(response.data);
      setFeed((feed) => {
        return [...feed, ...response.data.posts];
      });
      setLoading(false);
      console.log('fetch end', loading);
    } catch (err) {
      console.log(err);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      console.log('handleScroll', loading);
      setPage((prev) => prev - 5);
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      fetchPosts(categoryContext.isCategory);
      console.log(loading);
    }, 1500);
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <S.Container>
        {/* Header */}
        <HomeHeader />

        {/* TabMenu */}
        <HomeTabMenu fetchPosts={fetchPosts} />

        {/* FeedList */}
        {loading && <CardSkeleton cards={2} />}
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
        {loading && <Loader />}

        {/* Write Button */}
        <ButtonWrite />

        {/* Home Navibar */}
        <NaviBar />
      </S.Container>
    </>
  );
};

export default Home;
