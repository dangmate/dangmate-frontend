import React, { useEffect, useState } from 'react';
import ImageControl from '../../asset/ImageControl';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Button_Btn2 } from '../../../styles/style.font';
import { Common } from '../../../styles/common';
import axiosRequest from '../../../api/axios';
import { userState } from '../../../store/user';
import { guestState } from '../../../store/guest';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

const S = {
  Like: styled.div`
    display: flex;
    align-items: center;
  `,
  Count: styled.div`
    width: ${getVwValue('10')};
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
    margin-top: ${getVwValue('0')};
  `,
  LikeTrueWrap: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('24')};
    height: ${getVwValue('24')};
    margin-top: ${getVwValue('-3')};
  `
};
interface IProps {
  like: number;
  isLike: boolean | undefined;
  postId: number;
}

const LikeAction = (props: IProps) => {
  const [like, setLike] = useState<boolean | undefined>(props.isLike);
  const [likeCount, setLikeCount] = useState<number>(props.like);
  const userData = useRecoilValue(userState);
  const isGuest = useRecoilValue(guestState);
  const navigate = useNavigate();

  const postLikeAction = async () => {
    if (isGuest) {
      navigate('/login');
      return;
    }
    const data = {
      userId: userData.userId,
      postId: props.postId
    };
    console.log(data);
    if (like) {
      return;
    }
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
    if (isGuest) {
      navigate('/login');
      return;
    }

    if (!like) {
      return;
    }
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
      {like ? (
        <S.LikeTrueWrap>
          <ImageControl
            width='24'
            height='24'
            src={'/svg/like_true.svg'}
            alt={'profile'}
          ></ImageControl>
        </S.LikeTrueWrap>
      ) : (
        <S.LikeWrap>
          <ImageControl
            width='24'
            height='24'
            src={'/svg/like.svg'}
            alt={'profile'}
          ></ImageControl>
        </S.LikeWrap>
      )}
      <S.Count>{likeCount}</S.Count>
    </S.Like>
  );
};
export default LikeAction;
