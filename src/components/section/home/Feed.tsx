import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from './UserName';
import Category from './Category';
import LikeAction from './LikeAction';
import CommentAction from '../comment/CommentAction';
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

  Content: styled.div`
    margin: ${getVwValue('30 0 35')};
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
  `,
  Time: styled.span``
};

interface IProps {
  data: Feed;
}
interface Feed {
  id: number;
  userName: string;
  userProfile: string;
  content: string;
  location: string;
  createTime: string;
  comment: number;
  like: number;
  category: string;
  media: string;
}

const Feed = (props: IProps) => {
  return (
    <S.Container>
      <S.Media>
        <img src={props.data.media} alt='thumb' />
      </S.Media>

      <S.FeedHead>
        <UserName
          src={props.data.userProfile}
          alt={'profile'}
          name={props.data.userName}
        />
        <Category title={props.data.category} />
      </S.FeedHead>

      <S.Content>{props.data.content}</S.Content>

      <S.Actions>
        <S.Column>
          <S.Location>{props.data.location}</S.Location>
          <S.Time>{props.data.createTime}</S.Time>
        </S.Column>
        <S.Column>
          <CommentAction />
          <LikeAction />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default Feed;
