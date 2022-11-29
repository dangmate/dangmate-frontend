import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../../asset/ImageControl';
import { Common } from '../../../styles/common';
import UserName from '../../asset/UserName';
import PostTime from '../home/PostTime';
import ButtonMore from '../../asset/ButtonMore';
import axiosRequest from '../../../api/axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import {
  CommentIdState,
  CommentUpdateState,
  CommentUserState,
  ReplyMode,
  UpdateMode
} from '../../../store/comment';
import { fetchCommentReply } from '../../../api/request';
import { Body_B2, Body_B3 } from '../../../styles/style.font';
import BottomMenu from '../../asset/BottomMenu';
import { useNavigate } from 'react-router-dom';

const S = {
  Container: styled.div``,
  Head: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${getVwValue('15')};
  `,
  Column: styled.div`
    display: flex;
    align-items: center;
  `,
  CommentContent: styled.div`
    color: ${Common.colors.grey_sub};
    ${Body_B2}
  `,
  TimeWrap: styled.div`
    margin-left: ${getVwValue('10')};
  `,
  Content: styled.div`
    padding: ${getVwValue('0 0 30 8')};
  `,
  ReplyContent: styled.div`
    padding: ${getVwValue('0 0 25 16')};
  `,
  Foot: styled.div`
    display: block;
    margin-top: ${getVwValue('18')};
  `,
  Write: styled.div``,
  TextBtn: styled.button`
    margin-left: ${getVwValue('15')};
    color: ${Common.colors.grey_sub};
    border-bottom: 1px solid ${Common.colors.grey_sub};
    cursor: pointer;
    ${Body_B3}
  `,
  Reply: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `
};

interface CommentType {
  commentId: number;
  content: string;
  createdAt: string;
  fullName: string;
  isComment: boolean;
  reply: number;
  profile: null | string;
}

interface CommentReplyType {
  replyId: number;
  content: string;
  createdAt: string;
  fullName: string;
  isReply: boolean;
  profile: string;
}

const Comment = (props: { data: CommentType; postId: string | undefined }) => {
  const userData = useRecoilValue(userState);
  const [replyData, setReplyData] = useState<CommentReplyType[]>([]);
  const [isShowReply, setIsShowReply] = useState(false);
  const [replyCount, setReplyCount] = useState(0);

  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [updateCommentData, setUpdateCommentData] = useState({
    commentId: 0,
    replyId: 0,
    content: ''
  });

  const [isReply, setReply] = useRecoilState(ReplyMode);
  const commentReplyUser = useSetRecoilState(CommentUserState);
  const setReplyCommentId = useSetRecoilState(CommentIdState);

  // 댓글 업데이트
  const setUpdateCommentStore = useSetRecoilState(CommentUpdateState);
  const setUpdateMode = useSetRecoilState(UpdateMode);

  const nagivate = useNavigate();

  // 대댓글 업데이트
  const fetchReplyList = async () => {
    if (props.data.reply > 0) {
      try {
        const res = await fetchCommentReply(
          props.postId,
          props.data.commentId,
          userData.userId
        );
        setReplyData(res.data.replies);
        // console.log(res.data.replies);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // reply button 클릭시 replymode, replyuser, replyid store에 저장
  const setReplyMode = () => {
    setReply(true);
    commentReplyUser(props.data.fullName);
    setReplyCommentId(props.data.commentId);
  };

  // 댓글 수정, 삭제
  const showBottomMenu = () => {
    console.log(props.data.commentId);
    setIsMenu(true);
    setUpdateCommentData({
      commentId: props.data.commentId,
      replyId: 0,
      content: props.data.content
    });
    setReply(false);
  };

  const onClickDeem = () => {
    setIsMenu(false);
  };

  const onClickUpdateComment = () => {
    setIsMenu(false);
    if (updateCommentData) {
      setUpdateCommentStore(updateCommentData);
      setUpdateMode(true);
      console.log(updateCommentData);
    }
  };
  const onClickDeleteComment = () => {
    if (window.confirm('정말로 댓글을 삭제할까요?')) {
      deleteComment();
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axiosRequest().delete(
        `/api/post/${props.postId}/comment/${updateCommentData.commentId}`,
        {
          data: { userId: userData.userId }
        }
      );
      if (response.status === 200) {
        console.log(response);
        console.log('삭제성공!');
        setIsMenu(false);
        // nagivate(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //대댓글 수정,삭제
  const showBottomMenuReply = (replyId: number, content: string) => {
    setIsMenu(true);
    setReply(true);
    setUpdateCommentData({
      commentId: props.data.commentId,
      replyId: replyId,
      content: content
    });
  };

  const onClickUpdateCommentReply = () => {
    setIsMenu(false);
    if (updateCommentData) {
      setUpdateCommentStore(updateCommentData);
      setUpdateMode(true);
      console.log(updateCommentData);
    }
  };

  const onClickDeleteCommentReply = () => {
    if (window.confirm('정말로 댓글을 삭제할까요?')) {
      deleteCommentReply();
    }
  };

  const deleteCommentReply = async () => {
    try {
      const response = await axiosRequest().delete(
        `/api/post/${props.postId}/reply/${updateCommentData.replyId}?userId=${userData.userId}&commentId=${updateCommentData.commentId}`
      );
      if (response) {
        const newReplyList = replyData.filter(
          (item) => item.replyId !== response.data.replyId
        );
        setReplyData(newReplyList);
        setIsMenu(false);
        setReplyCount((replyCount) => replyCount - 1);
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReplyList();
  }, []);

  useEffect(() => {
    setReplyCount(props.data.reply);
  }, []);

  return (
    <S.Container>
      <S.Head>
        <S.Column>
          <UserName
            src={
              props.data.profile ? props.data.profile : '/images/profile.png'
            }
            alt={'profile'}
            name={props.data.fullName}
          ></UserName>
          <S.TimeWrap>
            <PostTime data={props.data.createdAt} />
          </S.TimeWrap>
        </S.Column>

        {props.data.fullName === userData.fullName && (
          <S.Column onClick={showBottomMenu}>
            <ButtonMore />
          </S.Column>
        )}
      </S.Head>

      <S.Content>
        <S.CommentContent>{props.data.content}</S.CommentContent>

        <S.Foot>
          <S.Column>
            <S.Write onClick={setReplyMode}>
              <ImageControl
                width={'24'}
                height={'24'}
                src={'/svg/write_fill.svg'}
                alt={'write'}
              />
            </S.Write>
            <S.TextBtn onClick={() => setIsShowReply(!isShowReply)}>
              답글 {replyCount}
            </S.TextBtn>
          </S.Column>
        </S.Foot>
      </S.Content>

      {props.data.reply > 0 &&
        isShowReply &&
        replyData.map((reply, index) => (
          <S.Reply key={index}>
            <S.Head>
              <S.Column>
                <UserName
                  src={
                    reply['profile'] ? reply['profile'] : '/images/profile.png'
                  }
                  alt={'profile'}
                  name={reply['fullName']}
                ></UserName>
                <S.TimeWrap>
                  <PostTime data={reply['createdAt']} />
                </S.TimeWrap>
              </S.Column>

              {userData.fullName === reply['fullName'] && (
                <S.Column
                  onClick={() =>
                    showBottomMenuReply(reply['replyId'], reply['content'])
                  }
                >
                  <ButtonMore />
                </S.Column>
              )}
            </S.Head>

            <S.ReplyContent>
              <S.CommentContent>{reply['content']}</S.CommentContent>
            </S.ReplyContent>
          </S.Reply>
        ))}
      {isMenu && !isReply && (
        <BottomMenu
          updateText={'댓글 수정하기'}
          deleteText={'댓글 삭제하기'}
          update={onClickUpdateComment}
          delete={onClickDeleteComment}
          deem={onClickDeem}
        />
      )}
      {isMenu && isReply && (
        <BottomMenu
          updateText={'댓글 수정하기'}
          deleteText={'댓글 삭제하기'}
          update={onClickUpdateCommentReply}
          delete={onClickDeleteCommentReply}
          deem={onClickDeem}
        />
      )}
    </S.Container>
  );
};

export default Comment;
