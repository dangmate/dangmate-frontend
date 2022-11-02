/* global kakao */
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { requestLogin, LoginType } from '../api/request';
import axios from 'axios';
import { Address } from '../api/address';

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

interface InputProps {
  state?: string;
}

const S = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    padding: ${getVwValue('0 20')};
  `,
  Arrow: styled.div`
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
  Title: styled.h3`
    padding: ${getVwValue('10 0 68')};
    & > p {
      margin-top: ${getVwValue('10')};
      font-size: ${getVwValue('16')};
    }
  `,
  RegionContent: styled.div`
    height: ${getVwValue('300')};
    overflow-y: scroll;
  `,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: ${getVwValue('0 20 16')};
  `,
  Button: styled.div`
    width: 100%;
    margin-top: ${getVwValue('20')};
  `,
  Join: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  ArrowImg: styled.div`
    display: inline-block;
    width: ${getVwValue('10')};
    height: ${getVwValue('20')};
    margin-left: ${getVwValue('15')};
  `,
  Field: styled.div`
    margin-bottom: ${getVwValue('28')};
    ,
    & > p {
      color: ${Common.colors.system_error};
      font-size: ${getVwValue('12')};
    }
  `,
  Input: styled.input<InputProps>`
    display: block;
    width: 100%;
    padding: ${getVwValue('12')};
    margin-top: ${getVwValue('5')};
    border-bottom: 1px solid ${(props) => props.state};
  `
};

interface CoordsType {
  latitude: number;
  longitude: number;
}

interface LocationType {
  name: string;
  distance: number;
}
const LocationSearch = () => {
  const navigate = useNavigate();
  return (
    <S.Wrapper>
      <S.Arrow onClick={() => navigate(-1)}>
        <S.ImgWrap>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>
      <S.Content>
        <S.Title>
          내 동네 직접 검색
          <p>내 반려견에게 동네친구를 선물해 주세요!</p>
        </S.Title>

        <S.RegionContent>
          <ul>
            {/*{regionList*/}
            {/*  .sort((a, b) => a.distance - b.distance)*/}
            {/*  .map((item, index) => (*/}
            {/*    <li key={index}>*/}
            {/*      {item.name}*/}
            {/*      {item.distance}*/}
            {/*    </li>*/}
            {/*  ))}*/}
          </ul>
        </S.RegionContent>
      </S.Content>
      <S.Bottom>
        <S.Join onClick={() => navigate('/location')}>
          <span>내 위치 자동 검색</span>
          <S.ArrowImg>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ArrowImg>
        </S.Join>
        <S.Button>
          <ButtonRound disabled={false} type='button'>
            검색하기
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default LocationSearch;
