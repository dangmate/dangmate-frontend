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
import { distance } from '../utils/distance';
import { getCityCode } from '../utils/ciryCode';
import { Body_B2, Label_L2, Title_T1 } from '../styles/style.font';
import { C } from '../styles/emotionStyle';
import Loader from '../components/asset/Loader';
import ImageControl from '../components/asset/ImageControl';

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
  Title: styled.div`
    padding: ${getVwValue('10 0 40')};
    color: ${Common.colors.grey_headline};
    ${Title_T1}
    & > p {
      margin-top: ${getVwValue('8')};
      color: ${Common.colors.grey_sub};
      ${Body_B2}
    }
  `,
  RegionContent: styled.div`
    height: ${getVwValue('300')};
    overflow-y: scroll;
  `,
  SearchList: styled.ul`
    height: ${getVwValue('250')};
    overflow-y: scroll;
    & > li {
      padding: ${getVwValue('12 0')};
      cursor: pointer;
      font-size: ${getVwValue('14')};
      border-bottom: 1px solid ${Common.colors.line_medium};
    }
  `,
  Join: styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    & > span {
      color: ${Common.colors.grey_sub};
      ${Label_L2};
    }
  `,
  ArrowImg: styled.div`
    display: inline-block;
    width: ${getVwValue('8')};
    height: ${getVwValue('14')};
    margin-left: ${getVwValue('10')};
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
  `,
  ImageWrap: styled.div`
    display: flex;
    justify-content: center;
    //height: 100%;
    //align-items: center;
    // margin-bottom: ${getVwValue('130')};
    //flex: 1 1 0%;
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
  const [cityCode, setCityCode] = useState<string>('');

  const [regionList, setRegionList] = useState<object[]>([]);
  const [mapData, setMapData] = useState<object[]>([]);

  const [addressList, setAddressList] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);

  const [searchOn, setSearchOn] = useState(true);

  const [test, setTest] = useState<string[]>([]);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  /**
   * 1. ?????? ????????? ?????? ?????? ??? ??????(???????????????????????? ???????????? ???????????? ???????????? ??????)
   * ?????? ????????? ????????? ????????? ??? ?????? ??????
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
    // console.log('?????? ????????? ?????? ?????? ??????', coords);
    if (coords.latitude !== 0 && coords.longitude !== 0) {
      console.log('??????, ??????', coords);
      getRegionCityCode();
    }
  };

  /**
   * 2. ?????? ????????? ?????? ????????? citycode ??????(ex: ??????)
   * */
  const getRegionCityCode = () => {
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
      setCityCode(getCityCode(regionFirstName));
      console.log('citycode', cityCode);
    }

    if (cityCode) {
      getAddressList(cityCode);
    }

    // console.log(cityCode);
    // getAddressList(cityCode);
    // getRegionThirdList();
  };

  /**
   * 3. ?????? ????????? ?????? ????????? ???????????? ??????
   * */
  const getAddressList = async (code: string) => {
    // ???????????? ?????? accessToken ??????
    const response = await axios.get(
      'https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json',
      {
        params: {
          consumer_key: 'f59f1481b6c34d259fd8',
          consumer_secret: '578d46fd7efa4108aeb8'
        }
      }
    );
    // console.log('response', response);
    // ?????? ????????? ?????? ?????? ?????? ??????
    // ???????????? ?????? ???????????? ?????? ??? ????????? ????????? ??????.(?????????, ?????????, ?????????...)
    // ?????? ?????? ????????? ???????????? ????????? ???????????? ??????.

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

    // ?????? ???????????? array??? ??????['111230', '11250']
    const guCodeArray = await addressData.data.result.map(
      (item: any) => item.cd
    );

    const guSearch = await guCodeArray.forEach((item: any) => {
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
          setAddressList((prevState) => [...prevState, ...mapData]);
        });
    });

    Promise.all([response, addressData, guCodeArray, guSearch]).then(
      (value) => {
        console.log('value', value);
      }
    );
  };

  /**
   * 4. ?????? ???????????? ??????????????? ???????????? ?????? ???????????? ????????? ??????.*/
  const getRegionThirdList = async () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        // ????????? 6km ?????? ????????? ??????.
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

    const set = new Set(addressList);
    console.log('Set', set);

    const promised = [...set].map(async (value, index) => {
      await geocoder.addressSearch(value, callback);
    });

    await Promise.all(promised);
    console.log(regionList);
  };

  const autoSearch = () => {
    setSearchOn(false);
    setListLoading(true);
    setRegionList([]);
    getRegionThirdList();
    setTimeout(() => {
      setListLoading(false);
    }, 1500);
  };

  const onSelectHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setLocation(target.innerText);
    navigate('/join');
  };

  useEffect(() => {
    getCoords();
  }, [coords.latitude, coords.longitude, regionFirstName, cityCode]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <C.Wrapper>
      <S.Arrow onClick={() => navigate(-1)}>
        <S.ImgWrap>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>
      <S.Content>
        <S.Title>
          ??? ?????? ?????? ??????
          <p>
            ????????? ????????? ????????? ????????? ???????????? ?????? <br />
            ????????? ???????????? ???????????? ?????????.
          </p>
        </S.Title>
        {searchOn && (
          <S.ImageWrap>
            <ImageControl
              width='277'
              height='282'
              src={'/images/location.png'}
              alt={'char'}
            />
          </S.ImageWrap>
        )}

        <S.SearchList>
          {listLoading ? (
            <Loader />
          ) : (
            <>
              {regionList
                .sort((a: any, b: any) => a.distance - b.distance)
                .map((item: any, index) => (
                  <li onClick={onSelectHandler} key={index}>
                    {item.name}
                  </li>
                ))}
            </>
          )}
        </S.SearchList>
      </S.Content>
      <C.Bottom>
        <S.Join onClick={() => navigate('/location-search')}>
          <span>??? ?????? ?????? ????????????</span>
          <S.ArrowImg>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ArrowImg>
        </S.Join>
        <C.Button>
          <ButtonRound
            onClick={() => autoSearch()}
            disabled={loading}
            type='button'
          >
            {loading ? '?????? ?????? ???...' : '????????? ?????? ??????'}
          </ButtonRound>
        </C.Button>
      </C.Bottom>
    </C.Wrapper>
  );
};

export default Location;
