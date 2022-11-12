import React, { useEffect, useState, Fragment } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import Header from '../components/section/home/Header';
import { Common } from '../styles/common';
import TabMenu from '../components/section/home/TabMenu';
import Feed from '../components/section/home/Feed';
import { useNavigate } from 'react-router-dom';

const S = {
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};

const Home = () => {
  const [feed, setFeed] = useState([
    {
      id: 1,
      userName: '소심쟁이 제이',
      userProfile: '/images/profile.png',
      content:
        '강아지 주인 찾아요.\n 여기 공덕동이고, 갈색 진돗개 빨간색 목줄 암컷입니다. 강아지 산책하다 발견',
      location: '공덕동',
      createTime: '1시간전',
      comment: 0,
      like: 4,
      category: '댕댕 이야기',
      media: '/images/feed_thumb.jpg'
    },
    {
      id: 2,
      userName: '말광량이 조이',
      userProfile: '/images/profile.png',
      content:
        '강아지 주인 찾아요.\n 여기 공덕동이고, 갈색 진돗개 빨간색 목줄 암컷입니다. 강아지 산책하다 발견',
      location: '공덕동',
      createTime: '4분전',
      comment: 0,
      like: 4,
      category: '산책 메이트',
      media: '/images/feed_thumb.jpg'
    }
  ]);
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <TabMenu />
      <S.FeedList onClick={() => navigate('/view')}>
        {feed &&
          feed.map((item) => {
            return (
              <React.Fragment key={item.id}>
                <Feed data={item} />
              </React.Fragment>
            );
          })}
      </S.FeedList>
    </>
  );
};

export default Home;
