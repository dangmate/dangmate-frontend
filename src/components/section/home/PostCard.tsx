import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React from 'react';
import { Common } from '../../../styles/common';
import UserName from '../../asset/UserName';
import Category from '../../asset/Category';
import LikeAction from './LikeAction';
import CommentAction from '../comment/CommentAction';
import { Link } from 'react-router-dom';
import { Body_B2, Button_Btn2 } from '../../../styles/style.font';
import { CardType } from '../../../api/type';
import UserLocation from '../PostView/UserLocation';
import PostTime from './PostTime';
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
    color: ${Common.colors.grey_headline};
    ${Body_B2};
  `,
  Actions: styled.div`
    display: flex;
    justify-content: space-between;
  `,
  Column: styled.div`
    display: flex;
    align-items: center;
  `,
  Location: styled.div`
    margin-right: ${getVwValue('10')};
    color: ${Common.colors.grey_body};
    ${Button_Btn2}
  `
};

interface PostType {
  data: CardType;
}

const PostCard = (props: PostType) => {
  console.log(props);
  return (
    <S.Container>
      <Link to={`/view/${props.data.postId}`}>
        {props.data.thumbnail ? (
          <S.Media>
            <img src={props.data.thumbnail} alt='thumb' />
          </S.Media>
        ) : (
          <></>
        )}

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
          <UserLocation location={props.data.location} />
          <PostTime data={props.data.createdAt} />
        </S.Column>

        <S.Column>
          <CommentAction comment={props.data.comments} />
          <LikeAction
            like={props.data.likes}
            postId={props.data.postId}
            isLike={props.data.isLike}
          />
        </S.Column>
      </S.Actions>
    </S.Container>
  );
};

export default PostCard;
