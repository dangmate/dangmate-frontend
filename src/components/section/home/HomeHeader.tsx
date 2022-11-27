import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import ImageControl from '../../asset/ImageControl';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../store/user';
import { Title_T2 } from '../../../styles/style.font';
import { useNavigate } from 'react-router-dom';
import { guestState } from '../../../store/guest';

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
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const isGuest = useRecoilValue(guestState);

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
