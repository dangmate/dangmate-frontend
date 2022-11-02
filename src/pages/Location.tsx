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
const Location = () => {
  const navigate = useNavigate();
  // 1. 현재 위치의 위도 경도 값 추출
  const [coords, setCoords] = useState<CoordsType>({
    latitude: 0,
    longitude: 0
  });
  const [regionFirstName, setRegionFirstName] = useState<string>('');

  const [regionList, setRegionList] = useState<object[]>([]);
  // 현재 위치의 위도,경도 값 추출
  const getCoords = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => console.log(err)
    );
    await getRegionFirstName();
    console.log('현재 위치의 위도 경도 반환', coords);
  };

  // 현재 위치의 도시 이름 추출
  const getRegionFirstName = async () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );
    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setRegionFirstName(result[0].address.region_1depth_name);
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    if (regionFirstName) {
      await getRegionThirdList();
    }
    console.log('현재 도시', regionFirstName);
  };

  // region first name으로 행정동 리스트 추출
  const getRegionThirdList = async () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result[0]);
        const lat1 = Number(coords.latitude);
        const lon1 = Number(coords.longitude);
        const lat2 = Number(result[0].address.y);
        const lon2 = Number(result[0].address.x);

        console.log(result[0].address.address_name, lat1, lon1, lat2, lon2);

        const location: LocationType = {
          name: result[0].address.address_name,
          distance: CosineDistanceBetweenPoints(lat1, lon1, lat2, lon2)
        };

        setRegionList((regionList) => {
          return [...regionList, location];
        });
      }
    };

    await Address.forEach((item) => {
      geocoder.addressSearch(item.region_3depth_name, callback);
    });
  };

  function CosineDistanceBetweenPoints(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) {
    const R = 6371e3;
    const p1 = (lat1 * Math.PI) / 180;
    const p2 = (lat2 * Math.PI) / 180;
    const deltaP = p2 - p1;
    const deltaLon = lon2 - lon1;
    const deltaLambda = (deltaLon * Math.PI) / 180;
    const a =
      Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
      Math.cos(p1) *
        Math.cos(p2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
    return d;
  }

  useEffect(() => {
    getCoords();
  }, [coords.latitude, coords.longitude, regionFirstName]);

  return (
    <S.Wrapper>
      <S.Arrow>
        <S.ImgWrap>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>
      <S.Content>
        <S.Title>
          내 동네 찾기
          <p>내 반려견에게 동네친구를 선물해 주세요!</p>
        </S.Title>
        <S.RegionContent>
          <ul>
            {regionList
              .sort((a: any, b: any) => a.distance - b.distance)
              .map((item: any, index) => (
                <li key={index}>
                  {item.name}
                  {item.distance}
                </li>
              ))}
          </ul>
        </S.RegionContent>
      </S.Content>
      <S.Bottom>
        <S.Join onClick={() => navigate('/location-search')}>
          <span>내 위치 직접 검색</span>
          <S.ArrowImg>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ArrowImg>
        </S.Join>
        <S.Button>
          <ButtonRound onClick={getCoords} disabled={false} type='button'>
            자동 검색
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Location;
