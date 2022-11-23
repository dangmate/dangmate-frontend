import React, { useContext, useEffect, useRef, useState } from 'react';
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

const Home = () => {
  const userData = useRecoilValue(userState);
  const [feed, setFeed] = useState<CardType[]>([]);
  const categoryContext = useContext(FeedCategory);
  const firstIdRef = useRef(0);
  const lastPostIdRef = useRef<number | null>(null);

  // infinite scroll
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (category: string) => {
    if (firstIdRef.current === 0) {
      return;
    }
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    setTimeout(async () => {
      try {
        const response = await axiosRequest().post(
          `/api/posts?size=5&lastPostId=${lastPostIdRef.current}`,
          data
        );
        console.log(response.data);
        lastPostIdRef.current =
          response.data.posts[response.data.posts.length - 1].postId;
        setFeed((feed) => {
          return [...feed, ...response.data.posts];
        });
        // setFeed((prev, props) => [...prev, response.data.posts]);
        setLoading(false);
        console.log('fetch end', loading);
      } catch (err) {
        console.log(err);
      }
    }, 1500);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (firstIdRef.current === lastPostIdRef.current) {
        console.log('끝');
        return;
      }
      setLoading(true);
      fetchPosts(categoryContext.isCategory);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLoading(true);

    setFeed(() => {
      return [];
    });
    const firstFetchPosts = async (category: string) => {
      console.log('category', category);
      const location = userData.location;
      const userId = userData.userId;
      const data = { location, category, userId };
      try {
        const response = await axiosRequest().post(`/api/posts?size=5`, data);
        console.log(response.data);
        firstIdRef.current = response.data.firstId;
        lastPostIdRef.current =
          response.data.posts[response.data.posts.length - 1].postId;
        setFeed(() => {
          return [...response.data.posts];
        });
        setLoading(false);
        console.log('fetch end', loading);
      } catch (err) {
        console.log(err);
      }
    };

    const firstFetchNoAuthPosts = async () => {
      // console.log('category', category);
      // const location = userData.location;
      // const userId = userData.userId;
      // const data = { location, category, userId };
      try {
        const response = await axiosRequest().get(`/api/posts?size=5`);
        console.log(response.data);
        // firstIdRef.current = response.data.firstId;
        // lastPostIdRef.current =
        //   response.data.posts[response.data.posts.length - 1].postId;
        setFeed(() => {
          return [...response.data.posts];
        });
        setLoading(false);
        console.log('fetch end', loading);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(async () => {
      console.log(feed);
      console.log(categoryContext.isCategory);
      if (userData.fullName) firstFetchPosts(categoryContext.isCategory);
      else firstFetchNoAuthPosts();
    }, 1000);
  }, [categoryContext.isCategory]);

  return (
    <>
      <S.Container>
        {/* Header */}
        <HomeHeader />

        {/* TabMenu */}
        <HomeTabMenu />

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
