import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import HomeTabMenu from '../components/section/home/HomeTabMenu';
import ButtonMore from '../components/asset/ButtonMore';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Title_T2 } from '../styles/style.font';
import PostCard from '../components/section/home/PostCard';
import PostEmpty from '../components/section/home/PostEmpty';
import LikeIcon from '../components/asset/LikeIcon';
import ButtonRound from '../components/asset/ButtonRound';

const S = {
  Container: styled.div`
    position: relative;
  `,
  Arrow: styled.div`
    display: flex;
    align-items: center;
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
  Text: styled.div`
    color: ${Common.colors.grey_sub};
    ${Title_T2}
  `
};
const Profile = () => {
  const navigate = useNavigate();
  return (
    <S.Container>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        <S.Text>프로필</S.Text>
      </S.Arrow>

      <div>
        <div>이미지</div>
        <div>닉네임</div>
        <div>이메일</div>
      </div>

      <div>
        <div>
          <div>내 게시물</div>
          <div>11</div>
        </div>
        <div>
          <div>내 댓글</div>
          <div>11</div>
        </div>
      </div>

      <div>
        <LikeIcon />
        <div>우만동 댕댕이</div>
        <div>489마리 댕댕이가 살고 있어요!</div>
      </div>

      <ButtonRound type='button' disabled={false}>
        프로필 수정
      </ButtonRound>

      <ul>
        <li>
          <div>버전 정보</div>
          <div>v0.10</div>
        </li>
        <li>
          <div>로그아웃</div>
          <S.ImgWrap>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ImgWrap>
        </li>
        <li>
          <div>회원 탈퇴</div>
          <S.ImgWrap>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ImgWrap>
        </li>
      </ul>
    </S.Container>
  );
};

export default Profile;
