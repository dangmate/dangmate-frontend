import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Body_B2 } from '../../../styles/style.font';
import ImageControl from '../../asset/ImageControl';

const S = {
  EmptyFeed: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${getVwValue('108 0 20')};
  `,
  Text: styled.div`
    text-align: center;
    ${Body_B2}
  `,
  Text2: styled.div`
    padding: ${getVwValue('10 0 50')};
    text-align: center;
    ${Body_B2}
  `
};
export const PostEmpty = () => {
  return (
    <S.EmptyFeed>
      <S.Text>댕댕이들에게 말을 걸어보세요!</S.Text>
    </S.EmptyFeed>
  );
};

export const LikeEmpty = () => {
  return (
    <S.EmptyFeed>
      <ImageControl
        width='160'
        height='160'
        src={'/images/likeEmpty.png'}
        alt={'profile'}
      ></ImageControl>
      <S.Text2>좋아요한 게시물이 없어요</S.Text2>
    </S.EmptyFeed>
  );
};

export const MyPostEmpty = () => {
  return (
    <S.EmptyFeed>
      <ImageControl
        width='160'
        height='160'
        src={'/images/likeEmpty.png'}
        alt={'profile'}
      ></ImageControl>
      <S.Text2>등록한 게시물이 없어요</S.Text2>
    </S.EmptyFeed>
  );
};
