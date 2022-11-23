import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import React, { useState } from 'react';
import { Common } from '../../../styles/common';
import UserName from '../../asset/UserName';
import LikeAction from './LikeAction';
import CommentAction from '../comment/CommentAction';
import { Link } from 'react-router-dom';
import { Body_B2, Body_B3, Button_Btn2 } from '../../../styles/style.font';
import { CardType } from '../../../api/type';
import UserLocation from '../PostView/UserLocation';
import PostTime from './PostTime';
import CardSkeleton from './CardSkeleton';
const S = {
  Container: styled.div`
    padding: ${getVwValue('40 0')};
    border-bottom: 1px solid ${Common.colors.line_medium};
  `,
  TextBtn: styled.button`
    margin-left: ${getVwValue('15')};
    color: ${Common.colors.grey_sub};
    border-bottom: 1px solid ${Common.colors.grey_sub};
    cursor: pointer;
    ${Body_B3}
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

const CommentCard = (props: PostType) => {
  const [detailData, setDetailData] = useState(props.data);
  return (
    <>
      {detailData ? (
        <S.Container>
          <Link to={`/view/${detailData.postId}`}>
            <S.FeedHead>
              <UserName
                src={
                  detailData.profile ? detailData.profile : 'images/profile.png'
                }
                alt={''}
                name={detailData.fullName}
              />
              <S.TextBtn>답글 {'4'}</S.TextBtn>
            </S.FeedHead>

            <S.Content>{detailData.content}</S.Content>
          </Link>
        </S.Container>
      ) : (
        <CardSkeleton cards={1} />
      )}
    </>
  );
};

export default CommentCard;
