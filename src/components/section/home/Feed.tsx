import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import ImageControl from './ImageControl';
import { a } from 'msw/lib/glossary-dc3fd077';

const S = {
  Container: styled.div`
    padding: ${getVwValue('40 0')};
    border-bottom: 1px solid ${Common.colors.line_medium};
  `,
  Media: styled.div`
    width: 100%;
    height: ${getVwValue('180')};
    margin-bottom: ${getVwValue('23')};
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
  Nick: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.span`
    margin-left: ${getVwValue('5')};
  `,
  Category: styled.div`
    padding: ${getVwValue('3 10')};
    border: 1px solid ${Common.colors.primary_emphasis};
    border-radius: ${getVwValue('16')};
    & > span {
      color: ${Common.colors.primary_emphasis};
    }
  `,
  Content: styled.div`
    margin: ${getVwValue('30 0 35')};
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `,
  Actions: styled.div``,
  Location: styled.span``,
  Time: styled.span``,
  Comment: styled.div`
    display: flex;
    align-items: center;
  `,
  Like: styled.div`
    display: flex;
    align-items: center;
  `,
  Count: styled.div`
    margin-left: ${getVwValue('5')};
  `,
  LikeWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('24')};
    height: ${getVwValue('24')};
  `
};

const Feed = () => {
  return (
    <S.Container>
      <S.Media>
        <img src='/images/feed_thumb.jpg' alt='thumb' />
      </S.Media>

      <S.FeedHead>
        <S.Nick>
          <ImageControl
            width='18'
            height='18'
            src={'/images/profile.png'}
            alt={'profile'}
          />
          <S.Text>토종그잡체 풍이</S.Text>
        </S.Nick>
        <S.Category>
          <span>산책 메이트</span>
        </S.Category>
      </S.FeedHead>

      <S.Content>
        나는 풍이. 부산을 대표하는 풍산개. 공놀이 좋아하고 터그도 기가 막히게 잘
        하지. 근데 요즘 주인놈이 놀아주는게 영 맘에 안들어서 같이 놀 댕댕이
        구한다. 만나서 냄새 맡을 때는 예의지켜
      </S.Content>

      <S.Actions>
        <div>
          <S.Location>공덕동</S.Location>
          <S.Time>4분 전</S.Time>
        </div>
        <div>
          <CommentAction />
          <LikeAction />
        </div>
      </S.Actions>
    </S.Container>
  );
};

const CommentAction = () => {
  return (
    <S.Comment>
      <ImageControl
        width='18'
        height='17'
        src={'/images/comment.svg'}
        alt={'profile'}
      ></ImageControl>
      <S.Count>3</S.Count>
    </S.Comment>
  );
};

const LikeAction = () => {
  return (
    <S.Like>
      <S.LikeWrap>
        <ImageControl
          width='16'
          height='16'
          src={'/images/like.svg'}
          alt={'profile'}
        ></ImageControl>
      </S.LikeWrap>
      <S.LikeWrap>
        <ImageControl
          width='22'
          // height='24'
          src={'/images/like_true.svg'}
          alt={'profile'}
        ></ImageControl>
      </S.LikeWrap>
      <S.Count>5</S.Count>
    </S.Like>
  );
};

export default Feed;
