import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeHeader from '../components/section/home/HomeHeader';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import PostCard from '../components/section/home/PostCard';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { PostEmpty } from '../components/section/home/PostEmpty';
import { FeedCategory } from '../context/FeedCategory';
import ButtonWrite from '../components/asset/ButtonWrite';
import NaviBar from '../components/asset/NaviBar';
import { CardType } from '../api/type';
import Loader from '../components/asset/Loader';
import CardSkeleton from '../components/section/home/CardSkeleton';
import { guestState } from '../store/guest';

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
  const isGuest = useRecoilValue(guestState);

  // infinite scroll
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);
  const [noAuthScroll, setNoAuthScroll] = useState(0);

  const [scrollLoading, setScrollLoading] = useState(false);
  const isInitialMount = useRef(true);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (firstIdRef.current === lastPostIdRef.current) {
        console.log('끝');
        return;
      }
      setScrollLoading(true);
      isInitialMount.current = false;
      if (!isGuest) setScroll((scroll) => scroll + 1);
      else setNoAuthScroll((noAuthScroll) => noAuthScroll + 1);
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

    const firstFetchNoAuthPosts = async () => {
      // console.log('category', category);
      // const location = userData.location;
      // const userId = userData.userId;
      // const data = { location, category, userId };
      try {
        const response = await axiosRequest().get(`/api/posts?size=5`);
        console.log(response.data);
        console.log('firstIdRef.current', firstIdRef.current);
        firstIdRef.current = response.data.firstId;
        lastPostIdRef.current =
          response.data.posts[response.data.posts.length - 1].postId;
        setFeed(() => {
          return [...response.data.posts];
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(async () => {
      console.log(feed);
      console.log(categoryContext.isCategory);
      firstFetchNoAuthPosts();
    }, 1000);
  }, [categoryContext.isCategory]);

  useEffect(() => {
    const fetchNoAuthPosts = async (category: string) => {
      if (firstIdRef.current === 0 || isInitialMount.current) {
        return;
      } else {
        console.log('scroll', noAuthScroll);
        console.log(firstIdRef.current);
        console.log('실행');
      }
      // console.log('firstIdRef', firstIdRef);
      // console.log('lastpostidRef', lastPostIdRef);
      // const data = {
      //   location: userData.location,
      //   userId: userData.userId,
      //   category
      // };

      try {
        const response = await axiosRequest().get(
          `/api/posts?size=5&lastPostId=${lastPostIdRef.current}`
        );
        console.log(response.data);
        lastPostIdRef.current =
          response.data.posts[response.data.posts.length - 1].postId;
        setFeed((feed) => {
          return [...feed, ...response.data.posts];
        });
        setScrollLoading(false);
        console.log('fetch end', loading);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(async () => {
      fetchNoAuthPosts(categoryContext.isCategory);
    }, 1500);
  }, [noAuthScroll]);

  return (
    <>
      <S.Container>
        {/* Header */}
        <HomeHeader />

        {/* TabMenu */}
        <HomeTabMenu />

        {/* FeedList */}
        {loading && <CardSkeleton cards={1} />}
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
        {scrollLoading && <Loader />}

        {/* Write Button */}
        <ButtonWrite />

        {/* Home Navibar */}
        <NaviBar />
      </S.Container>
    </>
  );
};

export default Home;