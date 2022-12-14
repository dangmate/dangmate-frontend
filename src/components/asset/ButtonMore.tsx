import React from 'react';
import ImageControl from './ImageControl';

const ButtonMore = () => {
  return (
    <ImageControl
      width={'24'}
      height={'24'}
      src={'/svg/more.svg'}
      alt={'more'}
    />
  );
};

export default ButtonMore;
