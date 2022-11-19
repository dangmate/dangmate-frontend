import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate, useParams } from 'react-router-dom';
import FeedView from '../components/section/postView/PostViewItem';
import CommentState from '../components/section/comment/CommentState';
import CommentArea from '../components/section/comment/CommentArea';
import axiosRequest from '../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../store/user';
import ImageControl from '../components/asset/ImageControl';
import { Common } from '../styles/common';
import ButtonMore from '../components/asset/ButtonMore';
import CommentInput from '../components/section/comment/CommentInput';
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
    & > span {
      display: flex;
      margin-left: ${getVwValue('35')};
    }
  `,
  Deem: styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
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

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const userData = useRecoilValue(userState);
  const [data, setData] = useState<PostType>();

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const [isDeem, setIsDeem] = useState(false);

  const [commentData, setCommentData] = useState([]);

  const [commentCount, setCommentCount] = useState(0);

  const fetchPost = async () => {
    try {
      const response = await axiosRequest().get(
        `/api/post/${postId}/user/${userData.userId}`
      );
      console.log(response.data);
      setData(response.data);
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

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

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

      <S.Container>
        <FeedView data={data} commentCount={commentCount} />
        <CommentState comments={commentCount} />
        <CommentArea postId={postId} commentData={commentData} />
      </S.Container>

      <CommentInput fetchComments={fetchComments} postUser={data?.fullName} />

      {isMenu && (
        <S.BottomMenu>
          <S.Row onClick={onClickUpdatePost}>
            <ImageControl
              src={'/svg/update.svg'}
              width={'18'}
              height={'18'}
              alt={'update'}
            />
            <span>수정하기</span>
          </S.Row>
          <S.Row onClick={onClickDeletePost}>
            <ImageControl
              src={'/svg/delete.svg'}
              width={'14'}
              height={'18'}
              alt={'delete'}
            />
            <span>삭제하기</span>
          </S.Row>
        </S.BottomMenu>
      )}
      {isDeem && <S.Deem onClick={onClickDeem} />}
    </>
  );
};

export default PostView;
