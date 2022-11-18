import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../../asset/ImageControl';
import { Common } from '../../../styles/common';
import UserName from '../../common/UserName';
import PostTime from '../home/PostTime';
import ButtonMore from '../../asset/ButtonMore';
import axiosRequest from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';

const S = {
  Container: styled.div`
    margin-bottom: ${getVwValue('32')};
  `,
  Head: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${getVwValue('15')};
  `,
  Column: styled.div`
    display: flex;
  `,
  TimeWrap: styled.div`
    margin-left: ${getVwValue('10')};
  `,
  Content: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `,
  Foot: styled.div`
    display: block;
    margin-top: ${getVwValue('15')};
  `,
  Write: styled.div``,
  TextBtn: styled.button`
    margin-left: ${getVwValue('15')};
    color: ${Common.colors.grey_sub};
    border-bottom: 1px solid ${Common.colors.grey_sub};
    cursor: pointer;
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
}

const Comment = (props: { data: CommentType; postId: string | undefined }) => {
  const userData = useRecoilValue(userState);
  const [replyData, setReplyData] = useState([]);
  const [isShowReply, setIsShowReply] = useState(false);

  const fetchCommentReply = async () => {
    if (props.data.reply > 0) {
      try {
        const { data } = await axiosRequest().get(
          `/api/post/${props.postId}/comment/${props.data.commentId}/replies?userId=${userData.userId}`
        );
        setReplyData(data.replies);
        console.log(data.replies);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchCommentReply();
  }, []);

  return (
    <S.Container>
      <S.Head>
        <S.Column>
          <UserName
            src={'/images/profile.png'}
            alt={'profile'}
            name={props.data.fullName}
          ></UserName>
          <S.TimeWrap>
            <PostTime data={props.data.createdAt} />
          </S.TimeWrap>
        </S.Column>

        <S.Column>
          <ButtonMore />
        </S.Column>
      </S.Head>

      <S.Content>
        <S.Column>{props.data.content}</S.Column>

        <S.Foot>
          <S.Column>
            <S.Write>
              <ImageControl
                width={'24'}
                height={'24'}
                src={'/svg/write_fill.svg'}
                alt={'write'}
              />
            </S.Write>
            <S.TextBtn onClick={() => setIsShowReply(!isShowReply)}>
              답글 {props.data.reply}
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

              <S.Column>
                <ButtonMore />
              </S.Column>
            </S.Head>

            <S.Content>
              <S.Column>{reply['content']}</S.Column>
            </S.Content>
          </S.Reply>
        ))}
    </S.Container>
  );
};

export default Comment;
