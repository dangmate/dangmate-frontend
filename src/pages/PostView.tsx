import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate, useParams } from 'react-router-dom';
import PostViewDetail from '../components/section/PostView/PostViewDetail';
import CommentState from '../components/section/comment/CommentState';
import CommentArea from '../components/section/comment/CommentArea';
import axiosRequest from '../api/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../store/user';
import ImageControl from '../components/asset/ImageControl';
import { Common } from '../styles/common';
import ButtonMore from '../components/asset/ButtonMore';
import CommentInput from '../components/section/comment/CommentInput';
import { CardViewType } from '../api/type';
import { Button_Btn2 } from '../styles/style.font';
import BottomMenu from '../components/asset/BottomMenu';
import CardDetailSkeleton from '../components/section/home/CardDetailSkeleton';

const S = {
  Container: styled.div`
    padding: ${getVwValue('0 20 110')};
  `,
  Arrow: styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: ${getVwValue('64')};
  `,
  ImgWrap: styled.div`
    position: relative;
    display: inline-block;
    height: 100%;
    padding: ${getVwValue('0 28')};
    vertical-align: center;
    cursor: pointer;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: ${getVwValue('10')};
      height: ${getVwValue('20')};
      object-fit: contain;
    }
  `,
  ImageWrap: styled.div`
    width: ${getVwValue('20')};
    display: flex;
    justify-content: center;
  `,
  Column: styled.div`
    display: flex;
    align-items: center;
    padding-right: ${getVwValue('24')};
  `,
  BottomMenu: styled.div`
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
  `,
  Row: styled.div`
    display: flex;
    align-items: center;
    height: ${getVwValue('56')};
    padding-left: ${getVwValue('20')};
    background: ${Common.colors.grey_white};
  `,
  Deem: styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
  `,
  Text: styled.div`
    display: flex;
    margin-left: ${getVwValue('35')};
    ${Button_Btn2}
  `
};

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const userData = useRecoilValue(userState);
  const [data, setData] = useState<CardViewType | undefined>();

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const [isDeem, setIsDeem] = useState(false);

  const [commentData, setCommentData] = useState([]);

  const [commentCount, setCommentCount] = useState(0);

  const [relatedUsers, setRelatedUsers] = useState(0);

  const fetchPost = async () => {
    try {
      const response = await axiosRequest().get(
        `/api/post/${postId}/user/${userData.userId}`
      );
      setData(response.data);
      setRelatedUsers(response.data.relatedUsers);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async () => {
    try {
      const response = await axiosRequest().delete(
        `/api/post/${postId}/user/${userData.userId}`
      );
      if (response) {
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axiosRequest().get(
        `/api/post/${postId}/comments?userId=${userData.userId}`
      );
      console.log(data.comments);
      setCommentCount(data.comments.length);
      setCommentData(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickShowMenu = () => {
    setIsMenu(true);
    setIsDeem(true);
  };

  const onClickDeem = () => {
    setIsMenu(false);
    setIsDeem(false);
  };

  const onClickUpdatePost = () => {
    const postId = data?.postId;
    navigate(`/upload/${postId}`);
  };

  const onClickDeletePost = () => {
    if (window.confirm('정말로 게시글을 삭제할까요?')) {
      deletePost();
    }
  };

  const onScrollHandler = () => {
    if (isMenu && isDeem) {
      setIsMenu(false);
      setIsDeem(false);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });

  return (
    <>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate('/home')}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        {data?.isPost && (
          <S.Column onClick={onClickShowMenu}>
            <ButtonMore />
          </S.Column>
        )}
      </S.Arrow>

      {data && relatedUsers && postId && commentData ? (
        <S.Container>
          <PostViewDetail postData={data} commentCount={commentCount} />
          <CommentState relatedCount={relatedUsers} />
          <CommentArea postId={postId} commentData={commentData} />
        </S.Container>
      ) : (
        <CardDetailSkeleton cards={1} />
      )}

      <CommentInput fetchComments={fetchComments} postUser={data?.fullName} />

      {isMenu && (
        <BottomMenu
          updateText={'수정하기'}
          deleteText={'삭제하기'}
          update={onClickUpdatePost}
          delete={onClickDeletePost}
          deem={onClickDeem}
        />
      )}
    </>
  );
};

export default PostView;
