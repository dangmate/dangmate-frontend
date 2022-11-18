import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import Comment from './Comment';
import axiosRequest from '../../../api/axios';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';

const S = {
  Container: styled.div`
    margin-bottom: ${getVwValue('3')};
  `,
  Reply: styled.div`
    padding: ${getVwValue('0 0 0 12')};
  `
};
interface IProp {
  postId: string | undefined;
}

const CommentArea = (props: IProp) => {
  const userData = useRecoilValue(userState);
  const [commentData, setCommentData] = useState([]);

  const fetchComments = async () => {
    try {
      const { data } = await axiosRequest().get(
        `/api/post/${props.postId}/comments?userId=${userData.userId}`
      );
      console.log(data.comments);
      setCommentData(data.comments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <S.Container>
      {commentData.map((comment, index) => (
        <Comment key={index} data={comment} postId={props.postId} />
      ))}
    </S.Container>
  );
};

export default CommentArea;
