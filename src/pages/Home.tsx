import React, {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  useRef
} from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeHeader from '../components/section/home/HomeHeader';
import { Common } from '../styles/common';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import PostItem from '../components/section/home/PostItem';
import { useNavigate } from 'react-router-dom';
import ArrowBack from '../components/asset/ArrowBack';
import ImageControl from '../components/asset/ImageControl';
import Category from '../components/common/Category';
import ButtonRound from '../components/asset/ButtonRound';
import axiosRequest, { axiosMultiRequest } from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import UploadForm from '../components/section/home/UploadForm';

const S = {
  Container: styled.div`
    position: relative;
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  WriteBtn: styled.div`
    position: fixed;
    bottom: ${getVwValue('24')};
    right: ${getVwValue('20')};
    width: auto;
    height: auto;
    border-radius: ${getVwValue('12')};
    box-shadow: 0 0 12px rgba(83, 55, 194, 0.5);
  `
};

const Home = () => {
  const [feed, setFeed] = useState([]);
  const [writeMode, setWriteMode] = useState<boolean>(false);
  const userData = useRecoilValue(userState);

  const fetchPosts = async (category: string) => {
    const location = userData.location;
    const userId = userData.userId;
    const data = { location, category, userId };
    try {
      const response = await axiosRequest().post(
        '/api/posts?size=5&lastPostId=10',
        data
      );
      console.log(response.data);
      setFeed(response.data.posts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts('all');
  }, [writeMode]);

  return (
    <>
      {writeMode ? (
        <UploadForm setWriteMode={setWriteMode} />
      ) : (
        <S.Container>
          <HomeHeader />
          <HomeTabMenu fetchPosts={fetchPosts} />
          <S.FeedList>
            {feed &&
              feed.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <PostItem data={item} />
                  </React.Fragment>
                );
              })}
          </S.FeedList>
          <S.WriteBtn onClick={() => setWriteMode(true)}>
            <ImageControl
              width={'44'}
              height={'44'}
              src={'/svg/write_btn.svg'}
              alt={''}
            />
          </S.WriteBtn>
        </S.Container>
      )}
    </>
  );
};

export default Home;
