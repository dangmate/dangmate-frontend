import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { requestLogin, LoginType } from '../api/request';
import axios from 'axios';

interface InputProps {
  state?: string;
}

interface SubmitType {
  email: string;
  pwd: string | number;
  nick: string;
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
  `,
  Form: styled.form``,
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
    width: ${getVwValue('200')};
    margin: 0 auto;
    background: url('/images/join_arrow.png') no-repeat right center/contain;
    background-size: ${getVwValue('10')};
    cursor: pointer;
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

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// 6~12자리 이내의 정규식
const PWD_REGEX = /^[A-Za-z0-9]{6,12}$/;
// 1~6자리 문자
const NICK_REGEX = /^[A-Za-z가-힣]{1,6}$/;

const Join = () => {
  const navigate = useNavigate();
  const userRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [firstStep, setStep] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [checkUniqEmail, setCheckUniqEmail] = useState<boolean>(true);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
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

  const inputUserState = () => {
    let color = '';
    if (!!email && !validEmail) color = Common.colors.system_error;
    else if (!!email && validEmail) color = Common.colors.system_good;
    else if (!email && !validEmail) color = Common.colors.grey_disabled;
    return color;
  };
  const inputPwdState = () => {
    let color = '';
    if (!!pwd && !validPwd) color = Common.colors.system_error;
    else if (!!pwd && validPwd) color = Common.colors.system_good;
    else if (!pwd && !validPwd) color = Common.colors.grey_disabled;
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
    setValidEmail(EMAIL_REGEX.test(email));
    checkEmail();
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setValidNick(NICK_REGEX.test(nickname));
  }, [nickname]);

  useEffect(() => {
    setValidKeyword(NICK_REGEX.test(keyword));
    checkNickname();
  }, [keyword]);

  /**
   * email uniq check
   * */
  const checkEmail = () => {
    if (email && validEmail) {
      axios.post('/join/email-check', email).then((res) => {
        if (res.data.check) {
          setCheckUniqEmail(true);
        } else {
          setCheckUniqEmail(false);
        }
      });
    }
  };

  /**
   * nickname uniq check
   * */
  const checkNickname = () => {
    if (nickname && validNick && keyword && validKeyword) {
      const data = { nickname, keyword };
      axios.post('/join/nick-check', data).then((res) => {
        if (res.data.check) {
          setCheckUniqNick(true);
        } else {
          setCheckUniqNick(false);
        }
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nick = keyword + ' ' + nickname;
    const data: SubmitType = { email, pwd, nick };
    try {
      const res = await axios.post('/join', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      console.log(res.data);
      await alert(`${res.data?.param.nick}님 환영합니다!`);
      setEmail('');
      setPwd('');
      setMatchPwd('');
      setNickname('');
      setKeyword('');
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.Wrapper>
      {firstStep ? (
        <>
          <S.Arrow>
            <S.ImgWrap onClick={() => navigate(-1)}>
              <img src='/images/back_arrow.png' alt='arrow' />
            </S.ImgWrap>
          </S.Arrow>
          <S.Content>
            <S.Title>
              내 정보 입력 (1/2)
              <br />
              서울 마포구 공덕동
            </S.Title>
            <S.Form>
              <div>
                <S.Field>
                  <label htmlFor='email'>이메일</label>
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
                    state={inputUserState()}
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
                  <label htmlFor='password'>비밀번호</label>
                  <S.Input
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='off'
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    placeholder='N자리 이상 입력해 주세요.'
                    state={inputPwdState()}
                  />
                  {pwd && !validPwd ? (
                    <p>6자리 이상의 비밀번호를 입력해 주세요.</p>
                  ) : (
                    <></>
                  )}
                </S.Field>
                <S.Field>
                  <label htmlFor='confirmPassword'>비밀번호 재입력</label>
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
          <S.Bottom>
            <S.Join onClick={() => navigate('/join')}>
              <span>내 지역이 잘못 입력됐나요?</span>
            </S.Join>
            <S.Button onClick={() => setStep(!firstStep)}>
              <ButtonRound
                disabled={!(validEmail && validPwd && validMatch)}
                type='button'
              >
                다음
              </ButtonRound>
            </S.Button>
          </S.Bottom>
        </>
      ) : (
        <>
          <S.Arrow onClick={() => setStep(true)}>
            <img src='/images/back_arrow.png' alt='arrow' />
          </S.Arrow>
          <S.Content>
            <S.Title>내 정보 입력 (2/2)</S.Title>
            <S.Form>
              <div>
                <S.Field>
                  <label htmlFor='nickname'>반려견 이름</label>
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
                  <label htmlFor='keyword'>
                    반려견을 한 단어로 표현한다면?
                  </label>
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

                  {nickname &&
                  validNick &&
                  keyword &&
                  validKeyword &&
                  !checkUniqNick ? (
                    <p>동일한 이름의 반려견이 이미 사용 중이에요.</p>
                  ) : (
                    <></>
                  )}
                </S.Field>
              </div>
            </S.Form>
          </S.Content>
          <S.Bottom>
            <S.Button onClick={handleSubmit}>
              <ButtonRound
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
        </>
      )}
    </S.Wrapper>
  );
};

export default Join;
