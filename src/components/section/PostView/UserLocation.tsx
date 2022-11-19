import React from 'react';
import styled from '@emotion/styled';
import { getVwValue } from '../../../styles/styleUtil';
import { Common } from '../../../styles/common';
import { Button_Btn2 } from '../../../styles/style.font';
const S = {
  Location: styled.div`
    margin-right: ${getVwValue('10')};
    color: ${Common.colors.grey_body};
    ${Button_Btn2}
  `
};

const UserLocation = (props: { location: string }) => {
  return (
    <>
      <S.Location>{props.location}</S.Location>
    </>
  );
};

export default UserLocation;
