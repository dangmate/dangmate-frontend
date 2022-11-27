import ImageControl from './ImageControl';
import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';
import { Title_T4 } from '../../styles/style.font';

const S = {
  Nick: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Text: styled.span`
    margin-left: ${getVwValue('5')};
    ${Title_T4}
  `,
  ImageWrap: styled.div`
    border-radius: 50%;
    overflow: hidden;
  `
};

interface IProps {
  src: string;
  alt: string;
  name: string;
}

const UserName = (props: IProps) => {
  return (
    <S.Nick>
      <S.ImageWrap>
        <ImageControl
          width='18'
          height='18'
          src={props.src}
          alt={props.alt}
          fit={'cover'}
        />
      </S.ImageWrap>
      <S.Text>{props.name}</S.Text>
    </S.Nick>
  );
};

export default UserName;
