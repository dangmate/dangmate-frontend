import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from '../../common/UserName';
import Category from '../../common/Category';
import LikeAction from './LikeAction';
import CommentAction from '../comment/CommentAction';
import { Link } from 'react-router-dom';
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
    overflow: hidden;
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

interface PostType {
  data: IProps;
}
interface IProps {
  category: string;
  content: string;
  createdAt: string;
  fullName: string;
  location: string;
  profile: string;
  thumbnail: string;
  comments: number;
  likes: number;
  postId: number;
}

const PostItem = (props: PostType) => {
  return (
    <S.Container>
      <Link to={`/view/${props.data.postId}`}>
        <S.Media>
          <img src={props.data.thumbnail} alt='thumb' />
        </S.Media>

        <S.FeedHead>
          <UserName
            src={props.data.profile ? props.data.profile : 'images/profile.png'}
            alt={''}
            name={props.data.fullName}
          />
          <Category title={props.data.category} />
        </S.FeedHead>

        <S.Content>{props.data.content}</S.Content>
      </Link>
      <S.Actions>
        <S.Column>
          <S.Location>{props.data.location}</S.Location>
          <S.Time>{props.data.createdAt}</S.Time>
        </S.Column>
        <S.Column>
          <CommentAction comment={props.data.comments} />
          <LikeAction like={props.data.likes} />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default PostItem;
