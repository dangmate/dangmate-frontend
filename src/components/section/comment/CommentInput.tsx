import ImageControl from '../../asset/ImageControl';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';
import axiosRequest from '../../../api/axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';
import { guestState } from '../../../store/guest';
import { useNavigate, useParams } from 'react-router-dom';
import { COMMENT_REGEX } from '../../../utils/regex';
import {
  CommentIdState,
  CommentUpdateState,
  CommentUserState,
  ReplyMode,
  UpdateMode
} from '../../../store/comment';
import { Label_L2 } from '../../../styles/style.font';

const S = {
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
    color: ${Common.colors.grey_headline};
    ${Label_L2}
    &::placeholder {
      color: ${Common.colors.grey_disabled};
    }
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
  `
};

interface IProp {
  fetchComments: () => void;
  postUser: string | undefined;
}

const CommentInput = (props: IProp) => {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const { postId } = useParams();
  const isGuest = useRecoilValue(guestState);

  const [comment, setComment] = useState<string>('');
  const [validComment, setValidComment] = useState<boolean>(false);
  const [commentFocus, setCommentFocus] = useState<boolean>(false);

  // ??????, ????????? ?????? ??????
  // ?????? ???????????? ????????? ?????? ????????? ???????????? ?????????
  // reply ????????? ????????? ?????? ?????? ??????????????? ?????????
  const [isReply, setReply] = useRecoilState(ReplyMode);
  const [commentReplyUser, setCommentReplyUser] =
    useRecoilState(CommentUserState);
  const [commentId, setCommentId] = useRecoilState(CommentIdState);

  // ?????? ?????? ??????
  const [updateMode, setUpdateMode] = useRecoilState(UpdateMode);
  const [updateCommentStoreData, setUpdateCommentStoreData] =
    useRecoilState(CommentUpdateState);

  // ?????? ??????
  const writeComment = async () => {
    const data = { userId: userData.userId, content: comment };
    console.log(data);
    try {
      const response = await axiosRequest().post(
        `/api/post/${postId}/comment`,
        data
      );
      console.log(response.data);
      await props.fetchComments();
      setComment('');
      setCommentFocus(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ?????? ??????
  const updateComment = async () => {
    const data = { userId: userData.userId, content: comment };
    console.log(data);
    try {
      const response = await axiosRequest().put(
        `/api/post/${postId}/comment/${updateCommentStoreData.commentId}`,
        data
      );
      console.log(response.data);
      await props.fetchComments();
      setComment('');
      setCommentFocus(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ????????? ??????
  const writeCommentReply = async () => {
    const data = { userId: userData.userId, content: comment, commentId };
    console.log(data);
    try {
      const response = await axiosRequest().post(
        `/api/post/${postId}/reply`,
        data
      );
      console.log(response.data);
      navigate(0);
      setComment('');
      setCommentFocus(false);
    } catch (err) {
      console.log(err);
    }
  };

  // ????????? ??????
  const updateCommentReply = async () => {
    const data = {
      userId: userData.userId,
      content: comment,
      commentId: updateCommentStoreData.commentId
    };
    console.log(data);
    try {
      const response = await axiosRequest().put(
        `/api/post/${postId}/reply/${updateCommentStoreData.replyId}`,
        data
      );
      console.log(response.data);
      navigate(0);
      setComment('');
      setCommentFocus(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setCommentFocus(true);
  };

  const onScrollHandler = () => {
    setCommentFocus(false);
    setReply(false);
    setCommentReplyUser('');
    setCommentId(0);
    setUpdateMode(false);
    setUpdateCommentStoreData({ commentId: 0, replyId: 0, content: '' });
  };

  const onFocusHandler = () => {
    if (isGuest) navigate('/login');
    else setCommentFocus(true);
  };

  useEffect(() => {
    if (comment) {
      setValidComment(true);
    } else {
      setValidComment(false);
    }
    // setValidComment(COMMENT_REGEX.test(comment));
  }, [comment]);

  useEffect(() => {
    setComment(updateCommentStoreData.content);
    setCommentFocus(true);
  }, [updateMode]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });

  useEffect(() => {
    setCommentFocus(true);
  }, [commentReplyUser]);

  useEffect(() => {
    setCommentFocus(false);
  }, []);

  return (
    <S.Bottom>
      <S.InputWrap>
        <S.Input
          type='text'
          name='comment'
          id='comment'
          required
          value={comment}
          onChange={onChangeComment}
          onFocus={() => onFocusHandler()}
          // onBlur={() => setCommentFocus(false)}
          maxLength={100}
          placeholder={
            !isGuest ? '????????? ????????? ?????????.' : '????????? ??? ?????? ????????????.'
          }
        />
      </S.InputWrap>
      <S.Field focus={commentFocus}>
        {commentReplyUser ? (
          <S.P>{commentReplyUser}?????? ????????? ??????</S.P>
        ) : (
          <S.P>{props.postUser}?????? ?????? ??????</S.P>
        )}

        {updateMode ? (
          <S.SvgWrap
            valid={validComment}
            onClick={isReply ? updateCommentReply : updateComment}
          >
            <ImageControl
              src={'/svg/upload.svg'}
              width={'10'}
              height={'12'}
              alt={'arrow'}
            />
          </S.SvgWrap>
        ) : (
          <S.SvgWrap
            valid={validComment}
            onClick={isReply ? writeCommentReply : writeComment}
          >
            <ImageControl
              src={'/svg/upload.svg'}
              width={'10'}
              height={'12'}
              alt={'arrow'}
            />
          </S.SvgWrap>
        )}
      </S.Field>
    </S.Bottom>
  );
};

export default CommentInput;
