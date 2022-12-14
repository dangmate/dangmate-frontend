import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from '../../asset/UserName';
import Category from '../../asset/Category';
import LikeAction from '../home/LikeAction';
import CommentAction from '../comment/CommentAction';
import CountHits from './PostCountHit';
import PostTime from '../home/PostTime';
import { CardViewType } from '../../../api/type';
import { Body_B2 } from '../../../styles/style.font';
import UserLocation from './UserLocation';

const S = {
  Container: styled.div`
    padding: ${getVwValue('20 0 40')};
    border-bottom: 1px solid ${Common.colors.line_dark};
  `,
  Media: styled.div`
    width: 100%;
    height: ${getVwValue('180')};
    margin: ${getVwValue('30 0')};
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
    margin: ${getVwValue('30 0 65')};
    color: ${Common.colors.grey_sub};
    ${Body_B2};
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

interface IProps {
  postData: CardViewType;
  commentCount: number;
}

const FeedDetail = (props: IProps) => {
  console.log(props.postData);
  return (
    <S.Container>
      <S.FeedHead>
        <UserName
          src={
            props.postData.profile
              ? props.postData.profile
              : '/images/profile.png'
          }
          alt={''}
          name={props.postData.fullName}
        />
        <Category title={props.postData.category} />
      </S.FeedHead>
      <CountHits views={props.postData.views} />

      {props.postData.thumbnail ? (
        <S.Media>
          <img src={props.postData.thumbnail} alt='thumb' />
        </S.Media>
      ) : (
        <></>
      )}

      <S.Content>{props.postData.content}</S.Content>

      <S.Actions>
        <S.Column>
          <UserLocation location={props.postData.location} />
          <PostTime data={props.postData.createdAt} />
        </S.Column>
        <S.Column>
          <CommentAction comment={props.postData.comments} />
          <LikeAction
            like={props.postData.likes}
            isLike={props.postData.isLike}
            postId={props.postData.postId}
          />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default FeedDetail;
