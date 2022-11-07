/* global kakao */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { locationState } from '../store/locationState';
import { cosineDistanceBetweenPoints, distance } from '../utils/distance';
import { getCityCode } from '../utils/ciryCode';

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
  SearchList: styled.ul`
    height: ${getVwValue('400')};
    overflow: scroll;
    & > li {
      padding: ${getVwValue('12 0')};
      cursor: pointer;
      font-size: ${getVwValue('14')};
      border-bottom: 1px solid ${Common.colors.line_medium};
    }
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

const Location = () => {
  const navigate = useNavigate();
  const setLocation = useSetRecoilState(locationState);

  const [coords, setCoords] = useState<CoordsType>({
    latitude: 0,
    longitude: 0
  });
  const [regionFirstName, setRegionFirstName] = useState<string>('');

  const [regionList, setRegionList] = useState<object[]>([]);

  const [addressList, setAddressList] = useState<string[]>([]);

  const [sortState, setSortState] = useState<boolean>(false);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  /**
   * 1. 현재 위치의 위도 경도 값 추출(웹브라우저에서는 좌표값이 정확하지 않을수도 있음)
   * 해당 페이지 마운트 되었을 대 바로 실행
   */
  const getCoords = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => console.log(err),
      options
    );
    console.log('위도, 경도', coords);
    // console.log('현재 위치의 위도 경도 반환', coords);
    getRegionFirstName();
  };

  /**
   * 2. 현재 위치의 도시 이름만 추출(ex: 서울)
   * */
  const getRegionFirstName = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    const coord = new window.kakao.maps.LatLng(
      coords.latitude,
      coords.longitude
    );

    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        setRegionFirstName(result[0].address.region_1depth_name);
        console.log('현재 위치 도시 :', regionFirstName);
      }
    };

    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);

    const cityCode = getCityCode(regionFirstName);
    console.log(cityCode);
    getAddressList(cityCode);
    getRegionThirdList();
  };

  /**
   * 3. 해당 도시의 모든 행정동 리스트를 반환
   * */
  const getAddressList = async (code: string) => {
    // 인증키를 통해 accessToken 발급
    const response = await axios.get(
      'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
      {
        params: {
          consumer_key: 'f59f1481b6c34d259fd8',
          consumer_secret: '578d46fd7efa4108aeb8'
        }
      }
    );
    // 해당 도시에 대한 주소 코드 반환
    // 행정동에 대한 리스트가 아닌 구 단위의 코드를 반환.(강남구, 강서구, 강동구...)
    // 구에 대한 코드를 입력해야 행정동 리스트가 나옴.

    const addressData = await axios.get(
      'https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json',
      {
        params: {
          accessToken: response.data.result.accessToken,
          cd: code,
          pg_yn: '0'
        }
      }
    );
    // 서울 구 코드를 array로 반환
    const guCodeArray =
      (await addressData.data.result) &&
      (await addressData.data.result.map((item: any) => item.cd));

    // 구코드를 반복문으로 돌려 다시 검색
    (await guCodeArray) &&
      (await guCodeArray.forEach((item: any) => {
        axios
          .get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json', {
            params: {
              accessToken: response.data.result.accessToken,
              cd: item,
              pg_yn: '0'
            }
          })
          .then((res) => {
            const mapData =
              res.data.result &&
              res.data.result.map((item: any) => item.addr_name);
            const setData = () => {
              mapData.forEach((item: any) => {
                setAddressList((addressList) => [...addressList, item]);
              });
            };
            setData();
          });
      }));
  };

  /**
   * 4. 현재 좌표값과 행정동들의 좌표값을 모두 비교해서 거리를 반환.*/
  const getRegionThirdList = async () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // 거리가 6km 미만 주소만 검색.
        if (
          distance(
            coords.latitude,
            coords.longitude,
            Number(result[0].y),
            Number(result[0].x),
            'K'
          ) < 6
        ) {
          const location = {
            name: result[0].address.address_name,
            distance: distance(
              coords.latitude,
              coords.longitude,
              Number(result[0].y),
              Number(result[0].x),
              'K'
            )
          };
          setRegionList((regionList) => {
            return [...regionList, location];
          });
        }
      }
    };

    const promised = addressList.map(async (value, index) => {
      await geocoder.addressSearch(value, callback);
    });

    await Promise.all(promised);
    console.log(regionList);
  };

  const autoSearch = () => {
    setRegionList([]);
    getRegionThirdList();
  };

  const onSelectHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setLocation(target.innerText);
    navigate('/join');
  };

  useEffect(() => {
    getCoords();
  }, [coords.latitude, coords.longitude, regionFirstName]);

  return (
    <S.Wrapper>
      <S.Arrow onClick={() => navigate(-1)}>
        <S.ImgWrap>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>
      <S.Content>
        <S.Title>
          내 동네 찾기
          <p>내 반려견에게 동네친구를 선물해 주세요!</p>
        </S.Title>
        <S.SearchList>
          {regionList
            .sort((a: any, b: any) => a.distance - b.distance)
            .map((item: any, index) => (
              <li onClick={onSelectHandler} key={index}>
                {item.name}
              </li>
            ))}
        </S.SearchList>
      </S.Content>
      <S.Bottom>
        <S.Join onClick={() => navigate('/location-search')}>
          <span>내 위치 직접 검색</span>
          <S.ArrowImg>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ArrowImg>
        </S.Join>
        <S.Button>
          <ButtonRound
            onClick={() => autoSearch()}
            disabled={false}
            type='button'
          >
            자동 검색
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Location;