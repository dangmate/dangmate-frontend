import ImageControl from '../../asset/ImageControl';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';
import axiosRequest from '../../../api/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { useNavigate, useParams } from 'react-router-dom';
import { COMMENT_REGEX } from '../../../utils/regex';
import {
  CommentIdState,
  CommentUserState,
  ReplyMode
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

  const [comment, setComment] = useState<string>('');
  const [validComment, setValidComment] = useState<boolean>(false);
  const [commentFocus, setCommentFocus] = useState<boolean>(false);
  // 바로 댓글창을 누르면 해당 게시물 주인에게 포커스
  // reply 버튼을 누르면 해당 댓글 주인에게로 포커스
  const isReply = useRecoilValue(ReplyMode);
  const setReply = useSetRecoilState(ReplyMode);
  const commentUser = useRecoilValue(CommentUserState);
  const setCommentUser = useSetRecoilState(CommentUserState);
  const commentId = useRecoilValue(CommentIdState);
  const setCommentId = useSetRecoilState(CommentIdState);

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

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setCommentFocus(true);
  };

  const onScrollHandler = () => {
    if (commentFocus) {
      setCommentFocus(false);
      setReply(false);
      setCommentUser('');
      setCommentId(0);
    }
  };

  useEffect(() => {
    // fetchComments();
  }, []);

  useEffect(() => {
    setValidComment(COMMENT_REGEX.test(comment));
  }, [comment]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollHandler);
    return () => {
      window.removeEventListener('scroll', onScrollHandler);
    };
  });

  useEffect(() => {
    setCommentFocus(true);
  }, [commentUser]);

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
          onFocus={() => setCommentFocus(true)}
          // onBlur={() => setCommentFocus(false)}
          placeholder='댓글을 작성해 주세요.'
        />
      </S.InputWrap>
      <S.Field focus={commentFocus}>
        <S.P>{commentUser ? commentUser : props.postUser}에게 댓글 작성</S.P>
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
      </S.Field>
    </S.Bottom>
  );
};

export default CommentInput;
