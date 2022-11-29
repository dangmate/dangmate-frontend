import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../../asset/ImageControl';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../store/user';
import { Title_T2 } from '../../../styles/style.font';
import { useNavigate } from 'react-router-dom';
import { guestState } from '../../../store/guest';
import axiosRequest from '../../../api/axios';
import { UserType } from '../../../api/type';

const S = {
  Container: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${getVwValue('25 20 20')};
  `,
  H2: styled.h2`
    ${Title_T2}
  `,
  ImageWrap: styled.div`
    border-radius: 50%;
    overflow: hidden;
  `
};

const HomeHeader = () => {
  const navigate = useNavigate();
  const isGuest = useRecoilValue(guestState);
  const [userData, setUserData] = useRecoilState(userState);

  const fetchUserData = useCallback(async () => {
    try {
      const res = await axiosRequest().get(`/api/user/${userData.userId}`);
      if (res.status === 200) {
        setUserData((userData: UserType) => {
          return { ...userData, profile: res.data.profile };
        });
      }
    } catch (err: any) {
      if (err.status === 404) {
        console.log('존재하지 않는 유저입니다.');
      }
      if (err.status === 500) {
        console.log('유저 조회에 실패했습니다.');
      }
    }
  }, [userData.profile]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <S.Container>
      {userData.location ? (
        <S.H2>{userData.location} 댕댕이들</S.H2>
      ) : (
        <S.H2>댕댕이들 구경하기</S.H2>
      )}
      {!isGuest ? (
        <S.ImageWrap onClick={() => navigate('/profile')}>
          <ImageControl
            width='32'
            height='32'
            src={userData.profile ? userData.profile : 'images/profile.png'}
            alt={'profile'}
            fit={'cover'}
          />
        </S.ImageWrap>
      ) : (
        <></>
      )}
    </S.Container>
  );
};

export default HomeHeader;
