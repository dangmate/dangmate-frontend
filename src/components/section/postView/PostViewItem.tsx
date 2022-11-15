import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from '../../common/UserName';
import Category from '../../common/Category';
import LikeAction from '../home/LikeAction';
import CommentAction from '../comment/CommentAction';
import CountHits from './PostCountHit';
import PostTime from '../home/PostTime';
import { b } from 'msw/lib/glossary-dc3fd077';

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

interface PostType {
  category: string;
  comments: number;
  content: string;
  createdAt: string;
  fullName: string;
  isLike?: boolean;
  isPost?: boolean;
  likes: number;
  location: string;
  postId: number | null;
  profile: string | null;
  thumbnail: string;
  views?: number;
}

interface IProps {
  data: any;
}

const FeedDetail = (props: IProps) => {
  console.log(props.data);
  return (
    <S.Container>
      <S.FeedHead>
        <UserName
          src={
            props.data?.profile ? props.data?.profile : '/images/profile.png'
          }
          alt={''}
          name={props.data?.fullName}
        />
        <Category title={props.data?.category} />
      </S.FeedHead>
      <CountHits views={props.data?.views} />

      <S.Media>
        <img src={props.data?.thumbnail} alt='thumb' />
      </S.Media>

      <S.Content>{props.data?.content}</S.Content>

      <S.Actions>
        <S.Column>
          <S.Location>{props.data?.location}</S.Location>
          <PostTime data={props.data?.createdAt} />
        </S.Column>
        <S.Column>
          <CommentAction comment={props.data?.comments} />
          <LikeAction like={props.data?.likes} />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default FeedDetail;
