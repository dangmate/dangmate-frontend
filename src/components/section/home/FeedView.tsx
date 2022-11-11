import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from './UserName';
import Category from './Category';
import LikeAction from './LikeAction';
import CommentAction from '../comment/CommentAction';
import CountHits from './CountHit';
import PostTime from './PostTime';

const S = {
  Container: styled.div`
    padding: ${getVwValue('20 0 40')};
    border-bottom: 1px solid ${Common.colors.grey_sub};
  `,
  Media: styled.div`
    width: 100%;
    height: ${getVwValue('180')};
    margin: ${getVwValue('30 0')};
    border-radius: ${getVwValue('12')};
    & > img {
      object-fit: cover;
    }
  `,
  FeedHead: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  Content: styled.div`
    margin: ${getVwValue('30 0 60')};
  `,
  Actions: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Column: styled.div`
    display: flex;
  `,
  Location: styled.span`
    margin-right: ${getVwValue('10')};
  `
};

const FeedDetail = () => {
  return (
    <S.Container>
      <S.FeedHead>
        <UserName
          src={'/images/profile.png'}
          alt={'profile'}
          name={'소심쟁이 제이'}
        />
        <Category title='산책 메이트' />
      </S.FeedHead>
      <CountHits />

      <S.Media>
        <img src='/images/feed_thumb.jpg' alt='thumb' />
      </S.Media>

      <S.Content>
        나는 풍이. 부산을 대표하는 풍산개. 공놀이 좋아하고 터그도 기가 막히게 잘
        하지. 근데 요즘 주인놈이 놀아주는게 영 맘에 안들어서 같이 놀 댕댕이
        구한다. 만나서 냄새 맡을 때는 예의지켜
      </S.Content>

      <S.Actions>
        <S.Column>
          <S.Location>공덕동</S.Location>
          <PostTime />
        </S.Column>
        <S.Column>
          <CommentAction />
          <LikeAction />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default FeedDetail;
