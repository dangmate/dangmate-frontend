import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React, { useState } from 'react';
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
import CardSkeleton from './CardSkeleton';
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
  const [detailData, setDetailData] = useState(props.data);
  return (
    <>
      {detailData ? (
        <S.Container>
          <Link to={`/view/${detailData.postId}`}>
            {detailData.thumbnail ? (
              <S.Media>
                <img src={detailData.thumbnail} alt='thumb' />
              </S.Media>
            ) : (
              <></>
            )}

            <S.FeedHead>
              <UserName
                src={
                  detailData.profile ? detailData.profile : 'images/profile.png'
                }
                alt={''}
                name={detailData.fullName}
              />
              <Category title={detailData.category} />
            </S.FeedHead>

            <S.Content>{detailData.content}</S.Content>
          </Link>

          <S.Actions>
            <S.Column>
              <UserLocation location={detailData.location} />
              <PostTime data={detailData.createdAt} />
            </S.Column>

            <S.Column>
              <CommentAction comment={detailData.comments} />
              <LikeAction
                like={detailData.likes}
                postId={detailData.postId}
                isLike={detailData.isLike}
              />
            </S.Column>
          </S.Actions>
        </S.Container>
      ) : (
        <CardSkeleton cards={1} />
      )}
    </>
  );
};

export default PostCard;
