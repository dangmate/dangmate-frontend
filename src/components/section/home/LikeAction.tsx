import React, { useEffect, useState } from 'react';
import ImageControl from '../../asset/ImageControl';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Button_Btn2 } from '../../../styles/style.font';
import { Common } from '../../../styles/common';
import axiosRequest from '../../../api/axios';
import { userState } from '../../../store/user';
import { useRecoilValue } from 'recoil';

const S = {
  Like: styled.div`
    display: flex;
    align-items: center;
  `,
  Count: styled.div`
    margin-left: ${getVwValue('5')};
    color: ${Common.colors.grey_body};
    ${Button_Btn2}
  `,
  LikeWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('24')};
    height: ${getVwValue('24')};
  `
};
interface IProps {
  like: number;
  isLike: boolean | undefined;
  postId: number;
}

const LikeAction = (props: IProps) => {
  const [like, setLike] = useState<boolean | undefined>(props.isLike);
  const userData = useRecoilValue(userState);
  const [likeCount, setLikeCount] = useState<number>(props.like);

  const postLikeAction = async () => {
    const data = {
      userId: userData.userId,
      postId: props.postId
    };
    console.log(data);
    try {
      const response = await axiosRequest().post(`/api/post/like`, data);
      setLike(true);
      setLikeCount(likeCount + 1);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const postUnlikeAction = async () => {
    try {
      const response = await axiosRequest().delete(`/api/post/unlike`, {
        data: {
          userId: userData.userId,
          postId: props.postId
        }
      });
      setLike(false);
      setLikeCount(likeCount - 1);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // 로그인 && 해당 게시물 좋아요가 있을 때
    if (userData && props.isLike) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  return (
    <S.Like onClick={like ? postUnlikeAction : postLikeAction}>
      <S.LikeWrap>
        {like ? (
          <ImageControl
            width='24'
            // height='24'
            src={'/svg/like_true.svg'}
            alt={'profile'}
          ></ImageControl>
        ) : (
          <ImageControl
            width='18'
            height='16'
            src={'/svg/like.svg'}
            alt={'profile'}
          ></ImageControl>
        )}
      </S.LikeWrap>
      <S.Count>{likeCount}</S.Count>
    </S.Like>
  );
};
export default LikeAction;
