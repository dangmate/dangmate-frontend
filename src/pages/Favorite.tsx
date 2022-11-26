import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Title_T2 } from '../styles/style.font';
import PostCard from '../components/section/home/PostCard';
import { LikeEmpty } from '../components/section/home/PostEmpty';
import LikeTabMenu from '../components/section/home/LikeTabMenu';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import { guestState } from '../store/guest';

const S = {
  Container: styled.div`
    position: relative;
  `,
  Arrow: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${getVwValue('64')};
  `,
  ImgWrap: styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    padding: ${getVwValue('0 28')};
    vertical-align: center;
    cursor: pointer;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${getVwValue('10')};
      height: ${getVwValue('20')};
      object-fit: contain;
    }
  `,
  Text: styled.div`
    color: ${Common.colors.grey_sub};
    ${Title_T2}
  `,
  FeedList: styled.div`
    padding: ${getVwValue('0 20')};
  `
};
const Favorite = () => {
  const navigate = useNavigate();
  const [likeList, setLikeList] = useState([]);
  const userData = useRecoilValue(userState);
  const [category, setCategory] = useState<string>('all');

  const fetchLikeData = async () => {
    try {
      const res = await axiosRequest().get(
        `/api/user/${userData.userId}/likes?category=${category}`
      );
      if (res.status === 200) {
        setLikeList(res.data.likes);
        console.log(res.data.likes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchLikeData();
  }, [category]);

  return (
    <S.Container>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        <S.Text>관심 목록</S.Text>
      </S.Arrow>

      <LikeTabMenu setCategory={setCategory} />

      <S.FeedList>
        {likeList.length > 0 ? (
          likeList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PostCard data={item} />
              </React.Fragment>
            );
          })
        ) : (
          <LikeEmpty />
        )}
      </S.FeedList>
    </S.Container>
  );
};

export default Favorite;
