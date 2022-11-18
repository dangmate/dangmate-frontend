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
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    background: ${Common.colors.grey_white};
    padding: ${getVwValue('16 20 24')};
    border-top: 1px solid ${Common.colors.line_medium};
  `,
  Field: styled.div<{ focus: boolean }>`
    display: ${(props) => (props.focus ? 'flex' : 'none')};
    justify-content: space-between;
    align-items: center;
    height: ${getVwValue('28')};
    margin-top: ${getVwValue('12')};
  ,
  `,
  InputWrap: styled.div`
    display: flex;
    ,
  `,
  Input: styled.input`
    display: block;
    width: 100%;
    padding: ${getVwValue('12')};
    margin-top: ${getVwValue('5')};
    border-radius: ${getVwValue('16')};
    background: #f9f9fc;
  `,
  P: styled.p`
    color: ${Common.colors.grey_disabled};
    font-size: ${getVwValue('12')};
  `,
  SvgWrap: styled.div<{ valid: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${getVwValue('28')};
    height: ${getVwValue('28')};
    border-radius: ${getVwValue('24')};
    background: ${(props) =>
      props.valid ? Common.colors.primary : Common.colors.grey_disabled};
    pointer-events: ${(props) => (props.valid ? 'auto' : 'none')};
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
const TEXT_REGEX = /^[A-Za-z가-힣ㄱ-ㅎ!() ]{2,500}$/;

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const userData = useRecoilValue(userState);
  const [data, setData] = useState<PostType>();
  const [comment, setComment] = useState<string>('');
  const [validComment, setValidComment] = useState<boolean>(false);
  const [commentFocus, setCommentFocus] = useState<boolean>(false);

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const [isDeem, setIsDeem] = useState(false);

  const [commentData, setCommentData] = useState([]);

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
      // console.log(data.comments);
      setCommentData(data.comments);
    } catch (err) {
      console.log(err);
    }
  };

  const writeComment = async () => {
    const data = { userId: userData.userId, content: comment };
    console.log(data);
    try {
      const response = await axiosRequest().post(
        `/api/post/${postId}/comment`,
        data
      );
      console.log(response.data);
      await fetchComments();
      setComment('');
      setCommentFocus(false);
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
    if (window.confirm('삭제하나요?')) {
      deletePost();
    }
  };

  const onScrollHandler = () => {
    if (commentFocus) {
      setCommentFocus(false);
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setCommentFocus(true);
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  useEffect(() => {
    setValidComment(TEXT_REGEX.test(comment));
  }, [comment]);

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

      <S.Container>
        <FeedView data={data} />
        <CommentState comments={data?.comments} />
        <CommentArea postId={postId} commentData={commentData} />
      </S.Container>

      <S.Bottom>
        <S.InputWrap>
          <S.Input
            type='text'
            name='comment'
            id='comment'
            required
            value={comment}
            onChange={onChangeComment}
            onFocus={() => setCommentFocus(true)}
            // onBlur={() => setCommentFocus(false)}
            placeholder='댓글을 작성해 주세요.'
            // state={inputEmailState()}
          />
        </S.InputWrap>
        <S.Field focus={commentFocus}>
          <S.P>{data?.fullName}에게 댓글 작성</S.P>
          <S.SvgWrap valid={validComment} onClick={writeComment}>
            <ImageControl
              src={'/svg/upload.svg'}
              width={'10'}
              height={'12'}
              alt={'arrow'}
            />
          </S.SvgWrap>
        </S.Field>
      </S.Bottom>

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
