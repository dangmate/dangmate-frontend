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

const S = {
  Container: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  Arrow: styled.div`
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
    pointer-events: ${(props) => (props.valid ? 'initial' : 'none')};
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

  const fetchPostView = async () => {
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
  /* 왜 댓글을 적을때마다 리렌더링이 되는걸까요?*/
  useEffect(() => {
    fetchPostView();
  }, []);

  useEffect(() => {
    setValidComment(TEXT_REGEX.test(comment));
  }, [comment]);

  return (
    <>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>

      <S.Container>
        <FeedView data={data} />
        <CommentState comments={data?.comments} />
        <CommentArea />
      </S.Container>
      <S.Bottom>
        <S.InputWrap>
          <S.Input
            type='text'
            name='comment'
            id='comment'
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onFocus={() => setCommentFocus(true)}
            onBlur={() => setCommentFocus(false)}
            placeholder='댓글을 작성해 주세요.'
            // state={inputEmailState()}
          />
        </S.InputWrap>
        <S.Field focus={commentFocus}>
          <S.P>소심쟁이 제이에게 댓글 작성</S.P>
          <S.SvgWrap valid={validComment}>
            <ImageControl
              src={'/svg/upload.svg'}
              width={'10'}
              height={'12'}
              alt={'arrow'}
            />
          </S.SvgWrap>
        </S.Field>
      </S.Bottom>
    </>
  );
};

export default PostView;
