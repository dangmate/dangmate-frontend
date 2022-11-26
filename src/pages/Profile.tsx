import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import { Common } from '../styles/common';
import { Body_B2, Label_L2, Title_T2, Title_T4 } from '../styles/style.font';
import LikeIcon from '../components/asset/LikeIcon';
import ImageControl from '../components/asset/ImageControl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { guestState } from '../store/guest';
import { userState } from '../store/user';
import axiosRequest from '../api/axios';
import ProfileEdit from '../components/section/profile/ProfileEdit';
import profileEdit from '../components/section/profile/ProfileEdit';

interface ProfileType {
  comments: number;
  fullName: string;
  location: string;
  posts: number;
  profile: null | string;
  userId: number;
  users: number;
}

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
  const [isGuest, setGuest] = useRecoilState(guestState);
  const [userData, setUserData] = useRecoilState(userState);
  const [profileData, setProfileData] = useState<ProfileType>();
  const [editMode, setEditMode] = useState<boolean>(false);

  const onClickLogoutHandler = () => {
    if (window.confirm('정말로 로그아웃 할까요?')) {
      window.localStorage.removeItem('recoil-persist');
      setGuest(true);
      setUserData({ email: '', fullName: '', location: '', userId: 0 });
      navigate('/');
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axiosRequest().get(`/api/user/${userData.userId}`);
      if (res.status === 200) {
        setProfileData(res.data);
        console.log(profileData);
      }
    } catch (err: any) {
      if (err.status === 404) {
        console.log('존재하지 않는 유저입니다.');
      }
      if (err.status === 500) {
        console.log('유저 조회에 실패했습니다.');
      }
    }
  };

  const onClickDeleteUser = () => {
    if (confirm('정말로 회원 탈퇴 하시겠어요?')) {
      deleteUserData();
    }
  };

  const deleteUserData = async () => {
    try {
      const res = await axiosRequest().delete(`/api/user/${userData.userId}`);
      if (res.status === 200) {
        window.localStorage.removeItem('recoil-persist');
        setGuest(true);
        setUserData({ email: '', fullName: '', location: '', userId: 0 });
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/');
      }
    } catch (err: any) {
      if (err.status === 404) {
        alert('존재하지 않는 유저입니다.');
      }
      if (err.status === 500) {
        alert('유저 업데이트에 실패했습니다.');
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (isGuest) {
      navigate('/');
    }
  }, [isGuest]);

  return (
    <>
      {!editMode ? (
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
                src={
                  profileData?.profile
                    ? profileData.profile
                    : 'images/profile.png'
                }
                alt={'profile'}
              />
              <strong>{profileData?.fullName}</strong>
              <span>{userData.email}</span>
            </S.ProfileWrap>

            <S.MyPostStateWrap>
              <div>
                <span>내 게시물</span>
                <strong>{profileData?.posts}</strong>
              </div>
              <div>
                <span>내 댓글</span>
                <strong>{profileData?.comments}</strong>
              </div>
            </S.MyPostStateWrap>

            <S.LocationInfoWrap>
              <LikeIcon />
              <strong>{profileData?.location} 댕댕이</strong>
              <span>{profileData?.users}마리 댕댕이가 살고 있어요!</span>
            </S.LocationInfoWrap>

            <S.Button onClick={() => setEditMode(true)}>프로필 수정</S.Button>

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
              <li onClick={onClickDeleteUser}>
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
      ) : (
        <ProfileEdit
          setEditMode={setEditMode}
          profile={profileData?.profile}
          fullName={profileData?.fullName}
        />
      )}
    </>
  );
};

export default Profile;
