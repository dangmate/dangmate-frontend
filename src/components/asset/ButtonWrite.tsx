import ImageControl from './ImageControl';
import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { guestState } from '../../store/guest';

const S = {
  WriteBtn: styled.div`
    position: fixed;
    bottom: ${getVwValue('92')};
    right: ${getVwValue('20')};
    width: auto;
    height: auto;
    border-radius: ${getVwValue('12')};
    box-shadow: 0 0 12px rgba(83, 55, 194, 0.5);
    z-index: 100;
  `
};

const ButtonWrite = () => {
  const navigate = useNavigate();
  const isGuest = useRecoilValue(guestState);

  const onClickHandler = () => {
    if (isGuest) {
      navigate('/login');
    } else {
      navigate('/upload');
    }
  };

  return (
    <S.WriteBtn onClick={() => onClickHandler()}>
      <ImageControl
        width={'44'}
        height={'44'}
        src={'/svg/write_btn.svg'}
        alt={''}
      />
    </S.WriteBtn>
  );
};

export default ButtonWrite;
