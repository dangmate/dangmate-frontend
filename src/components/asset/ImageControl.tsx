import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../styles/styleUtil';

interface IProps {
  width: string;
  height?: string;
  fit?: string;
  src: string | undefined | null;
  alt: string;
}

const S = {
  ImgWrap: styled.div<IProps>`
    width: ${(props) => getVwValue(props.width)};
    height: ${(props) => (props.height ? getVwValue(props.height) : 'auto')};
    cursor: pointer;
    & > img {
      object-fit: ${(props) => (props.fit ? props.fit : 'contain')};
    }
  `
};
const ImageControl = (props: IProps) => {
  return (
    <S.ImgWrap {...props}>
      {props.src && <img src={props.src} alt={props.alt} />}
    </S.ImgWrap>
  );
};

export default ImageControl;
