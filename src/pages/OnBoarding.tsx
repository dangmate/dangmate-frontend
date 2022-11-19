import React from 'react';
import styled from '@emotion/styled';

const Section = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OnBoarding = () => {
  return (
    <Section>
      <h2>DANGMATE</h2>
    </Section>
  );
};

export default OnBoarding;
