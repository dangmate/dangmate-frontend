import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import FeedView from '../components/section/home/FeedView';
import CommentState from '../components/section/comment/CommentState';
import CommentArea from '../components/section/comment/CommentArea';

const S = {
  Container: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  Arrow: styled.div`
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
  `
};

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>

      <S.Container>
        <FeedView />
        <CommentState />
        <CommentArea />
      </S.Container>
    </>
  );
};

export default HomeView;
