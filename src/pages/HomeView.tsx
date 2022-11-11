import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import FeedView from '../components/section/home/FeedView';
import CommentState from '../components/section/comment/CommentState';
import UserName from '../components/section/home/UserName';
import PostTime from '../components/section/home/PostTime';
import ButtonMore from '../components/asset/ButtonMore';

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
  `
};

const HomeView = () => {
  const navigate = useNavigate();
  return (
    <>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>

      <S.Container>
        <FeedView />
        <CommentState />
        <CommentArea />
      </S.Container>
    </>
  );
};

const S2 = {
  Container: styled.div``,
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
  Foot: styled.div``
};

const CommentArea = () => {
  return (
    <>
      <S2.Container>
        <S2.Head>
          <S2.Column>
            <UserName
              src={'/images/profile.png'}
              alt={'profile'}
              name={'소심쟁이 제이'}
            ></UserName>
            <S2.TimeWrap>
              <PostTime />
            </S2.TimeWrap>
          </S2.Column>

          <S2.Column>
            <ButtonMore />
          </S2.Column>
        </S2.Head>

        <S2.Content>
          <span>
            OO동에 이사온지 얼마 되지 않아 아는 친구가 한 명도 없어요ㅜㅜ나이는
            25살 여자입니다! 같이 밥먹고 운동 다닐 동네 친구 구해요! 또래에 산책
            같이 마음 맞는 분 찾으면 좋겠어요!
          </span>
          <div>footer</div>
        </S2.Content>
      </S2.Container>
    </>
  );
};

export default HomeView;
