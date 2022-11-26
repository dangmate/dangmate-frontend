import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Body_B2, Label_L2, Title_T2, Title_T4 } from '../styles/style.font';
import LikeIcon from '../components/asset/LikeIcon';
import ImageControl from '../components/asset/ImageControl';

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
  svgWrap: styled.div`
    position: relative;
    display: inline-block;
    width: ${getVwValue('10')};
    height: ${getVwValue('20')};
    vertical-align: center;
    cursor: pointer;
    & > img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  `,
  Text: styled.div`
    color: ${Common.colors.grey_sub};
    ${Title_T2}
  `,
  Article: styled.div`
    padding: ${getVwValue('0 20')};
  `,
  ProfileWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${getVwValue('24 0 32')};

    & > strong {
      display: block;
      margin: ${getVwValue('16 0 5')};
      color: ${Common.colors.grey_headline};
      ${Title_T2}
    }
    & > span {
      display: block;
      color: ${Common.colors.grey_disabled};
      ${Label_L2}
    }
  `,
  MyPostStateWrap: styled.div`
    display: flex;
    background: #fafafd;
    padding: ${getVwValue('20 0')};
    border-radius: ${getVwValue('10')};

    & > div {
      width: 50%;
      text-align: center;
    }
    & strong {
      display: block;
      color: ${Common.colors.grey_sub};
      ${Title_T2}
    }
    & span {
      display: block;
      margin: ${getVwValue('0 0 8')};
      color: ${Common.colors.grey_body};
      ${Label_L2}
    }
  `,
  LocationInfoWrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${getVwValue('56 0 72')};
    & > strong {
      display: block;
      margin: ${getVwValue('10 0 2')};
      color: ${Common.colors.grey_headline};
      ${Title_T4}
    }
    & > span {
      display: block;
      color: #7d7d7d;
      ${Label_L2}
    }
  `,
  Button: styled.button`
    width: 100%;
    padding: ${getVwValue('18 0')};
    border: 1px solid ${Common.colors.line_dark};
    border-radius: ${getVwValue('6')};
    color: ${Common.colors.grey_sub};
    ${Label_L2}
  `,
  OptionUl: styled.ul`
    margin: ${getVwValue('64 0 92')};

    li {
      width: 100%;
      height: ${getVwValue('64')};
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      & > span {
        color: ${Common.colors.grey_body};
        ${Label_L2}
      }
      & > strong {
        color: ${Common.colors.grey_headline};
        ${Body_B2}
      }
    }
  `
};
const Profile = () => {
  const navigate = useNavigate();

  const onClickLogoutHandler = () => {
    if (window.confirm('정말로 로그아웃 할까요?')) {
      window.localStorage.removeItem('recoil-persist');
      navigate('/login');
    }
  };

  return (
    <S.Container>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
        <S.Text>프로필</S.Text>
      </S.Arrow>

      <S.Article>
        <S.ProfileWrap>
          <ImageControl
            width='56'
            height='56'
            src={'images/profile.png'}
            alt={'profile'}
          />
          <strong>닉네임</strong>
          <span>이메일</span>
        </S.ProfileWrap>

        <S.MyPostStateWrap>
          <div>
            <span>내 게시물</span>
            <strong>11</strong>
          </div>
          <div>
            <span>내 댓글</span>
            <strong>11</strong>
          </div>
        </S.MyPostStateWrap>

        <S.LocationInfoWrap>
          <LikeIcon />
          <strong>우만동 댕댕이</strong>
          <span>489마리 댕댕이가 살고 있어요!</span>
        </S.LocationInfoWrap>

        <S.Button>프로필 수정</S.Button>

        <S.OptionUl>
          <li>
            <strong>버전 정보</strong>
            <span>v0.10</span>
          </li>
          <li onClick={onClickLogoutHandler}>
            <strong>로그아웃</strong>
            <S.svgWrap>
              <img src='/images/join_arrow.png' alt='arrow' />
            </S.svgWrap>
          </li>
          <li>
            <strong style={{ color: Common.colors.system_error }}>
              회원 탈퇴
            </strong>
            <S.svgWrap>
              <img src='/images/join_arrow.png' alt='arrow' />
            </S.svgWrap>
          </li>
        </S.OptionUl>
      </S.Article>
    </S.Container>
  );
};

export default Profile;
