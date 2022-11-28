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
import { useNavigate } from 'react-router-dom';

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
  const isGuest = useRecoilValue(guestState);
  const navigate = useNavigate();

  // infinite scroll
  const firstIdRef = useRef(0);
  const lastPostIdRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);

  const [scrollLoading, setScrollLoading] = useState(false);
  const isInitialMount = useRef(true);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 2 >=
      document.documentElement.scrollHeight
    ) {
      console.log('sccroll!!!');
      if (firstIdRef.current === lastPostIdRef.current) {
        console.log('끝');
        return;
      }
      setScrollLoading(true);
      isInitialMount.current = false;
      setScroll((scroll) => scroll + 1);
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
      const param = {
        location: userData.location,
        category,
        userId: userData.userId
      };
      try {
        const { data } = await axiosRequest().post(`/api/posts?size=5`, param);

        firstIdRef.current = data.firstId;
        if (data.posts.length > 0) {
          lastPostIdRef.current = data.posts[data.posts.length - 1].postId;
        }
        setFeed(() => {
          return [...data.posts];
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(async () => {
      await firstFetchPosts(categoryContext.isCategory);
    }, 1000);
  }, [categoryContext.isCategory]);

  useEffect(() => {
    const fetchPosts = async (category: string) => {
      if (firstIdRef.current === 0 || isInitialMount.current) {
        return;
      }
      const data = {
        location: userData.location,
        userId: userData.userId,
        category
      };

      try {
        const response = await axiosRequest().post(
          `/api/posts?size=5&lastPostId=${lastPostIdRef.current}`,
          data
        );
        lastPostIdRef.current =
          response.data.posts[response.data.posts.length - 1].postId;
        setFeed((feed) => {
          return [...feed, ...response.data.posts];
        });
        setScrollLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(async () => {
      fetchPosts(categoryContext.isCategory);
    }, 1500);
  }, [scroll]);

  useEffect(() => {
    if (isGuest) {
      navigate('/feed');
    }
  }, [isGuest]);

  return (
    <>
      <S.Container>
        {/* Header */}
        <HomeHeader />

        {/* TabMenu */}
        <HomeTabMenu />

        {/* FeedList */}
        {loading ? (
          <CardSkeleton cards={1} />
        ) : (
          <S.FeedList>
            {feed.length > 0 ? (
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
        )}

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
