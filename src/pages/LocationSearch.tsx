import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { p } from 'msw/lib/glossary-dc3fd077';
import { useSetRecoilState } from 'recoil';
import { locationState } from '../store/locationState';
import { Body_B2, Label_L2, Title_T1 } from '../styles/style.font';

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100vh;
    min-height: ${getVwValue('550')};
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
  SearchList: styled.ul`
    height: ${getVwValue('300')};
    overflow: scroll;
    & > li {
      padding: ${getVwValue('12 0')};
      cursor: pointer;
      font-size: ${getVwValue('14')};
      border-bottom: 1px solid ${Common.colors.line_medium};
    }
  `,
  Bottom: styled.div`
    position: absolute;
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
    color: ${Common.colors.grey_headline};
    ${Label_L2};
    &::placeholder {
      color: ${Common.colors.grey_disabled};
    }
  `,
  Row: styled.div``
};

// 2~10자리 문자
const SEARCH_REGEX = /^[A-Za-z가-힣 ]{2,10}$/;
const LocationSearch = () => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState<string>('');
  const [validSearch, setValidSearch] = useState<boolean>(false);
  const [foundSearch, setFoundSearch] = useState<boolean>(true);
  const [searchList, setSearchList] = useState([]);
  const setLocation = useSetRecoilState(locationState);

  const onSearchHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSearch(target.value);
  };

  const addressSearch = () => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    const callback = function (result: any, status: any) {
      if (status === window.kakao.maps.services.Status.OK) {
        console.log(result);
        setSearchList(result);
      } else {
        setFoundSearch(false);
        setSearchList([]);
      }
    };
    geocoder.addressSearch(search, callback);
  };

  const inputSearchState = () => {
    let color = '';
    if (!!search && !validSearch) color = Common.colors.system_error;
    else if (!!search && !foundSearch) color = Common.colors.system_error;
    else if (!!search && validSearch) color = Common.colors.system_good;
    else if (!search && !validSearch) color = Common.colors.grey_disabled;
    return color;
  };

  const onSelectHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLTextAreaElement;
    if (target.innerText.split(' ').length !== 3) {
      alert('동,읍,면이 포함된 지역 이름을 입력해주세요');
      return;
    }
    setLocation(target.innerText);
    navigate('/join');
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidSearch(SEARCH_REGEX.test(search));
    setFoundSearch(true);
  }, [search]);
  return (
    <S.Wrapper>
      <S.Row>
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

          <S.Field>
            <S.Input
              type='text'
              name='search'
              id='search'
              ref={userRef}
              value={search}
              onChange={onSearchHandler}
              state={inputSearchState()}
              placeholder='내 동네 검색 (동,읍,면)'
            />
            {search && !validSearch ? <p>2글자 이상 입력해주세요.</p> : <></>}
            {search && validSearch && !foundSearch ? (
              <p>입력하신 동네를 찾을 수 없어요.</p>
            ) : (
              <></>
            )}
          </S.Field>
          <S.SearchList>
            {searchList.map((item, index) => (
              <li key={index} onClick={onSelectHandler}>
                {item['address_name']}
              </li>
            ))}
          </S.SearchList>
        </S.Content>
      </S.Row>
      <S.Row>
        <S.Bottom>
          <S.Join onClick={() => navigate('/location')}>
            <span>내 위치 자동 검색</span>
            <S.ArrowImg>
              <img src='/images/join_arrow.png' alt='arrow' />
            </S.ArrowImg>
          </S.Join>
          <S.Button onClick={addressSearch}>
            <ButtonRound disabled={!validSearch} type='button'>
              검색하기
            </ButtonRound>
          </S.Button>
        </S.Bottom>
      </S.Row>
    </S.Wrapper>
  );
};

export default LocationSearch;
