import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { useRecoilValue } from 'recoil';
import { locationState } from '../store/locationState';
import axiosRequest from '../api/axios';
import { Body_B2, Label_L2, Label_L3, Title_T1 } from '../styles/style.font';

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
  Title: styled.h3`
    padding: ${getVwValue('10 0 50')};
    color: ${Common.colors.grey_headline};
    ${Title_T1};
    & > p {
      margin-top: ${getVwValue('6')};
      color: ${Common.colors.primary_emphasis};
      ${Body_B2}
    }
  `,
  Form: styled.form``,
  Bottom: styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    //padding: ${getVwValue('0 20 16')};
  `,
  Button: styled.div`
    width: 100%;
    //margin-top: ${getVwValue('20')};
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
  Label: styled.label`
    color: ${Common.colors.grey_body};
    ${Label_L3};
  `,
  Row: styled.div``
};

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// 6~12자리 이내의 정규식
const PWD_REGEX = /^[A-Za-z0-9]{6,12}$/;
// 1~6자리 문자
const NICK_REGEX = /^[A-Za-z가-힣]{1,6}$/;

const Join = () => {
  const navigate = useNavigate();
  const location = useRecoilValue(locationState);

  const userRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [firstStep, setStep] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [checkUniqEmail, setCheckUniqEmail] = useState<boolean>(true);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [password, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>('');
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  const [nickname, setNickname] = useState<string>('');
  const [validNick, setValidNick] = useState<boolean>(false);
  const [nickFocus, setNickFocus] = useState<boolean>(false);

  const [keyword, setKeyword] = useState<string>('');
  const [validKeyword, setValidKeyword] = useState<boolean>(false);
  const [keywordFocus, setKeywordFocus] = useState<boolean>(false);
  const [checkUniqNick, setCheckUniqNick] = useState<boolean>(true);

  const [fullName, setFullName] = useState<string>('');

  const inputEmailState = () => {
    let color = '';
    if (!!email && !validEmail) color = Common.colors.system_error;
    else if (!checkUniqEmail) color = Common.colors.system_error;
    else if (!!email && validEmail) color = Common.colors.system_good;
    else if (!email && !validEmail) color = Common.colors.grey_disabled;
    return color;
  };
  const inputPwdState = () => {
    let color = '';
    if (!!password && !validPwd) color = Common.colors.system_error;
    else if (!!password && validPwd) color = Common.colors.system_good;
    else if (!password && !validPwd) color = Common.colors.grey_disabled;
    return color;
  };
  const inputMatchState = () => {
    let color = '';
    if (!!matchPwd && !validMatch) color = Common.colors.system_error;
    else if (!!matchPwd && validMatch) color = Common.colors.system_good;
    else if (!matchPwd) color = Common.colors.grey_disabled;
    return color;
  };

  const inputNickState = () => {
    let color = '';
    if (!!nickname && !validNick) color = Common.colors.system_error;
    else if (!!nickname && validNick) color = Common.colors.system_good;
    else if (!nickname) color = Common.colors.grey_disabled;
    return color;
  };

  const inputUniqNickState = () => {
    let color = '';
    if (!!keyword && !validKeyword) color = Common.colors.system_error;
    else if (!!keyword && !checkUniqNick) color = Common.colors.system_error;
    else if (!!keyword && validKeyword) color = Common.colors.system_good;
    else if (!keyword) color = Common.colors.grey_disabled;
    return color;
  };

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!location) {
      navigate('/location');
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    checkEmail();
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setValidNick(NICK_REGEX.test(nickname));
  }, [nickname]);

  useEffect(() => {
    setValidKeyword(NICK_REGEX.test(keyword));
  }, [keyword]);

  useEffect(() => {
    checkNickname();
  }, [nickname, keyword, fullName]);

  /**
   * email uniq check
   * */
  const checkEmail = async () => {
    if (email && validEmail) {
      const data = { email };
      try {
        const response = await axiosRequest().post('/api/user/email', data);
        setCheckUniqEmail(true);
        console.log(response);
      } catch (err) {
        console.log(err);
        setCheckUniqEmail(false);
      }
    }
  };

  /**
   * nickname uniq check
   * */
  const checkNickname = async () => {
    console.log('nick - ', nickname);
    console.log('keyword - ', keyword);
    if (nickname && keyword) {
      setFullName(`${keyword} ${nickname}`);
      console.log(fullName);
      try {
        const { data } = await axiosRequest().post(
          '/api/user/full-name',
          fullName
        );
        setCheckUniqNick(true);
        console.log(data);
        console.log(checkUniqNick);
      } catch (err) {
        console.log(err);
        console.log(checkUniqNick);
        setCheckUniqNick(false);
      }
    }
  };

  const handleSubmit = async () => {
    const shortLocation = location.split(' ')[2];
    const data = {
      email,
      password,
      fullName,
      location: shortLocation
    };
    try {
      const res = await axiosRequest().post('/api/user/signin', data);
      alert(`회원가입이 완료되었습니다!`);
      console.log(res.data);
      // await alert(`${res.data?.param.nick}님 환영합니다!`);
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setNickname('');
      setKeyword('');
      setSuccess(true);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Wrapper>
      {firstStep ? (
        <>
          <S.Row>
            <S.Arrow>
              <S.ImgWrap onClick={() => navigate(-1)}>
                <img src='/images/back_arrow.png' alt='arrow' />
              </S.ImgWrap>
            </S.Arrow>
            <S.Content>
              <S.Title>
                내 정보 입력 (1/2)
                <p>{location}</p>
              </S.Title>
              <S.Form>
                <div>
                  <S.Field>
                    <S.Label htmlFor='email'>이메일</S.Label>
                    <S.Input
                      type='email'
                      name='email'
                      id='email'
                      ref={userRef}
                      autoComplete='off'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      placeholder='올바른 이메일 형식을 입력해주세요.'
                      state={inputEmailState()}
                    />
                    {email && !validEmail ? (
                      <p>올바른 이메일 형식을 입력해 주세요.</p>
                    ) : (
                      <></>
                    )}
                    {email && validEmail && !checkUniqEmail ? (
                      <p>이미 사용중인 이메일입니다.</p>
                    ) : (
                      <></>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label htmlFor='password'>비밀번호</S.Label>
                    <S.Input
                      type='password'
                      name='password'
                      id='password'
                      autoComplete='off'
                      required
                      value={password}
                      onChange={(e) => setPwd(e.target.value)}
                      onFocus={() => setPwdFocus(true)}
                      onBlur={() => setPwdFocus(false)}
                      placeholder='6자리 이상 입력해 주세요.'
                      state={inputPwdState()}
                    />
                    {password && !validPwd ? (
                      <p>6자리 이상의 비밀번호를 입력해 주세요.</p>
                    ) : (
                      <></>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label htmlFor='confirmPassword'>비밀번호 재입력</S.Label>
                    <S.Input
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      autoComplete='off'
                      required
                      value={matchPwd}
                      onChange={(e) => setMatchPwd(e.target.value)}
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      placeholder='입력한 비밀번호를 입력해 주세요.'
                      state={inputMatchState()}
                    />
                    {matchPwd && !validMatch ? (
                      <p>입력한 비밀번호와 동일한 비밀번호를 입력해주세요.</p>
                    ) : (
                      <></>
                    )}
                  </S.Field>
                </div>
              </S.Form>
            </S.Content>
          </S.Row>
          <S.Row>
            <S.Bottom>
              {/*<S.Join onClick={() => navigate('/location')}>*/}
              {/*  <span>내 지역이 잘못 입력됐나요?</span>*/}
              {/*  <S.ArrowImg>*/}
              {/*    <img src='/images/join_arrow.png' alt='arrow' />*/}
              {/*  </S.ArrowImg>*/}
              {/*</S.Join>*/}
              <S.Button onClick={() => setStep(!firstStep)}>
                <ButtonRound
                  disabled={!(validEmail && validPwd && validMatch)}
                  type='button'
                >
                  다음
                </ButtonRound>
              </S.Button>
            </S.Bottom>
          </S.Row>
        </>
      ) : (
        <>
          <S.Row>
            <S.Arrow onClick={() => setStep(true)}>
              <S.ImgWrap onClick={() => navigate(-1)}>
                <img src='/images/back_arrow.png' alt='arrow' />
              </S.ImgWrap>{' '}
            </S.Arrow>
            <S.Content>
              <S.Title>
                내 댕댕이 정보 입력 (2/2)
                <p>{location}</p>
              </S.Title>
              <S.Form>
                <div>
                  <S.Field>
                    <S.Label htmlFor='nickname'>반려견 이름</S.Label>
                    <S.Input
                      type='text'
                      name='nickname'
                      id='nickname'
                      autoComplete='off'
                      required
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      onFocus={() => setNickFocus(true)}
                      onBlur={() => setNickFocus(false)}
                      placeholder='초코'
                      state={inputNickState()}
                    />
                    {nickname && !validNick ? (
                      <p>반려견 이름은 1~6자리 이상 입력할 수 없어요.</p>
                    ) : (
                      <></>
                    )}
                  </S.Field>
                  <S.Field>
                    <S.Label htmlFor='keyword'>
                      반려견을 한 단어로 표현한다면?
                    </S.Label>
                    <S.Input
                      type='text'
                      name='keyword'
                      id='keyword'
                      autoComplete='off'
                      required
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      onFocus={() => setKeywordFocus(true)}
                      onBlur={() => setKeywordFocus(false)}
                      placeholder='세젤귀'
                      state={inputUniqNickState()}
                    />
                    {keyword && !validKeyword ? (
                      <p>단어은 1~6자리 이상 입력할 수 없어요.</p>
                    ) : (
                      <></>
                    )}

                    {checkUniqNick ? (
                      <></>
                    ) : (
                      <p>동일한 이름의 반려견이 이미 사용 중이에요.</p>
                    )}
                  </S.Field>
                </div>
              </S.Form>
            </S.Content>
          </S.Row>
          <S.Row>
            <S.Bottom>
              <S.Button>
                <ButtonRound
                  onClick={handleSubmit}
                  disabled={
                    !(
                      validEmail &&
                      validPwd &&
                      validMatch &&
                      validNick &&
                      validKeyword
                    )
                  }
                  type='submit'
                >
                  회원가입 완료
                </ButtonRound>
              </S.Button>
            </S.Bottom>
          </S.Row>
        </>
      )}
    </S.Wrapper>
  );
};

export default Join;
