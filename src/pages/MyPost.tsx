import React, { useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Title_T2 } from '../styles/style.font';
import PostCard from '../components/section/home/PostCard';
import { MyPostEmpty } from '../components/section/home/PostEmpty';
import MyPostTabMenu from '../components/section/home/MyPostTabMenu';

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
const MyPost = () => {
  const navigate = useNavigate();
  const [myPostList, setMyPostList] = useState([]);
  return (
    <S.Container>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        <S.Text>내 게시물</S.Text>
      </S.Arrow>

      <MyPostTabMenu />

      <S.FeedList>
        {myPostList.length > 0 ? (
          myPostList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <PostCard data={item} />
              </React.Fragment>
            );
          })
        ) : (
          <MyPostEmpty />
        )}
      </S.FeedList>
    </S.Container>
  );
};

export default MyPost;