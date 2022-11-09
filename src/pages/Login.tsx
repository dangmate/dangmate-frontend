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

const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
const PWD_REGEX = /^[A-Za-z0-9]{6,12}$/;

const Login = () => {
  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>('');
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [collectPwd, setCollectPwd] = useState(true);

  const inputEmailState = () => {
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

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setCollectPwd(true);
  }, [pwd]);

  const handleSubmit = async () => {
    const data = { email, pwd };

    try {
      const response = await axios.post('/login', data);
      if (response.data.user) {
        console.log(response.data.accessToken);
        alert('로그인 성공!');
        setEmail('');
        setPwd('');
      } else {
        // 로그인을 실패했을 때는 wrongPwd 상태값을 변경
        setCollectPwd(false);
      }
    } catch (err) {
      console.log(err);
    }
    // 로그인을 성공했을 때 : accessToken을 저장
  };

  return (
    <S.Wrapper>
      <S.Arrow>
        <S.ImgWrap onClick={() => navigate(-1)}>
          <img src='/images/back_arrow.png' alt='arrow' />
        </S.ImgWrap>
      </S.Arrow>
      <S.Content>
        <S.Title>
          로그인하고
          <br /> 내 동네 댕댕이들 만나기
        </S.Title>

        <S.Form>
          <S.Field>
            <label htmlFor='email'>이메일</label>
            <S.Input
              type='email'
              name='email'
              id='email'
              ref={userRef}
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
            {!collectPwd ? <p>잘못된 비밀번호입니다.</p> : <></>}{' '}
          </S.Field>
        </S.Form>
      </S.Content>
      <S.Bottom>
        <S.Join onClick={() => navigate('/location')}>
          <span>초간단 회원가입</span>
          <S.ArrowImg>
            <img src='/images/join_arrow.png' alt='arrow' />
          </S.ArrowImg>
        </S.Join>
        <S.Button>
          <ButtonRound
            onClick={handleSubmit}
            disabled={!(validEmail && validPwd)}
            type='button'
          >
            로그인
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Login;
