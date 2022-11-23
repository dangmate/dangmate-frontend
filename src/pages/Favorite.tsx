import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import ButtonMore from '../components/asset/ButtonMore';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Title_T2 } from '../styles/style.font';
import PostCard from '../components/section/home/PostCard';
import PostEmpty from '../components/section/home/PostEmpty';

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
  `
};
const Favorite = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        <S.Text>관심 목록</S.Text>
      </S.Arrow>

      <HomeTabMenu />

      {/*<S.FeedList>*/}
      {/*  {feed ? (*/}
      {/*      feed.map((item, index) => {*/}
      {/*        return (*/}
      {/*            <React.Fragment key={index}>*/}
      {/*              <PostCard data={item} />*/}
      {/*            </React.Fragment>*/}
      {/*        );*/}
      {/*      })*/}
      {/*  ) : (*/}
      {/*      <PostEmpty />*/}
      {/*  )}*/}
      {/*</S.FeedList>*/}
    </S.Container>
  );
};

export default Favorite;
