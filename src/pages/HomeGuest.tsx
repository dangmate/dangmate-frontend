import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeHeader from '../components/section/home/HomeHeader';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import PostCard from '../components/section/home/PostCard';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
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
  const [feed, setFeed] = useState<CardType[]>([]);
  const categoryContext = useContext(FeedCategory);

  const isGuest = useRecoilValue(guestState);
  const navigate = useNavigate();

  // infinite scroll
  const firstIdRef = useRef(0);
  const lastPostIdRef = useRef<number | null>(null);
  const [loading, setLoading] = useState(true);

  const [scrollLoading, setScrollLoading] = useState(false);
  const isInitialMount = useRef(true);
  const timer = useRef<boolean>(false);

  const handleScroll = () => {
    const { scrollTop, scrollHeight } = document.documentElement;
    if (window.innerHeight + scrollTop + 10 >= scrollHeight) {
      // 더 이상 컨텐츠가 없을 때
      if (firstIdRef.current === lastPostIdRef.current) {
        return;
      }

      if (!timer.current) {
        timer.current = true;
        isInitialMount.current = false;
        setScrollLoading(true);
        setTimeout(() => {
          timer.current = false;
        }, 1500);
      }
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
      try {
        const response = await axiosRequest().get(
          `/api/posts?size=5&category=${category}`
        );
        console.log(response.data);
        firstIdRef.current = response.data.firstId;
        if (response.data.posts.length > 0) {
          lastPostIdRef.current =
            response.data.posts[response.data.posts.length - 1].postId;
        }
        setFeed(() => {
          return [...response.data.posts];
        });
        console.log('feed', feed);
        setLoading(false);
        console.log('fetch end', loading);
      } catch (err) {
        console.log(err);
      }
    };

    setTimeout(async () => {
      console.log(feed);
      console.log(categoryContext.isCategory);
      firstFetchPosts(categoryContext.isCategory);
    }, 1000);
  }, [categoryContext.isCategory]);

  useEffect(() => {
    const fetchPosts = async (category: string) => {
      if (firstIdRef.current === 0 || isInitialMount.current) {
        return;
      }

      try {
        const response = await axiosRequest().get(
          `/api/posts?size=5&lastPostId=${lastPostIdRef.current}&category=${category}`
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
      if (scrollLoading) fetchPosts(categoryContext.isCategory);
    }, 1500);
  }, [scrollLoading]);

  useEffect(() => {
    if (!isGuest) {
      navigate('/home');
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
