import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Common } from '../styles/common';
import { useNavigate } from 'react-router-dom';
import { getVwValue } from '../styles/styleUtil';
import ButtonRound from '../components/asset/ButtonRound';
import { requestLogin, LoginType } from '../api/request';

interface InputProps {
  err: boolean;
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
    height: 100%;
    cursor: pointer;
    padding: ${getVwValue('24 28')};
    & > img {
      width: ${getVwValue('10')};
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
    width: ${getVwValue('150')};
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
    border-bottom: ${(props) =>
      props.err
        ? '1.5px solid ' + Common.colors.system_error
        : '1px solid ' + Common.colors.grey_disabled};
  `
};

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [psErrorMsg, setPsErrorMsg] = useState('');

  const handleEmailChange = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    setEmail(target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent) => {
    const target = e.currentTarget as HTMLInputElement;
    setPassword(target.value);
  };

  const validateEmail = (value: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!regex.test(value)) {
      setEmailErrorMsg('올바른 이메일 형식을 입력해 주세요.');
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const validatePassword = (value: string) => {
    if (value.length < 4) {
      setPsErrorMsg('잘못된 비밀번호입니다.');
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleEmailBlur = () => {
    validateEmail(email);
  };

  const handlePasswordBlur = () => {
    validatePassword(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateEmail(email);
    validatePassword(password);
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      const data = { email, password };
      // console.log(email, password);
      onLogin(data);
      alert('로그인 성공!');
    }
  };

  const onLogin = (data: LoginType) => {
    requestLogin(data);
    setEmail('');
    setPassword('');
  };

  return (
    <S.Wrapper>
      <S.Arrow onClick={() => navigate(-1)}>
        <img src='/images/back_arrow.png' alt='arrow' />
      </S.Arrow>
      <S.Content>
        <S.Title>
          로그인하고
          <br /> 내 동네 댕댕이들 만나기
        </S.Title>

        <S.Form noValidate>
          <S.Field>
            <label htmlFor='email'>이메일</label>
            <S.Input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              err={emailError}
              placeholder='올바른 이메일 형식을 입력해주세요.'
            />
            {emailError && <p>{emailErrorMsg}</p>}
          </S.Field>
          <S.Field>
            <label htmlFor='password'>비밀번호</label>
            <S.Input
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              err={passwordError}
              placeholder='N자리 이상 입력해 주세요.'
            />
            {passwordError && <p>{psErrorMsg}</p>}
          </S.Field>
        </S.Form>
      </S.Content>
      <S.Bottom>
        <S.Join onClick={() => navigate('/join')}>
          <span>초간단 회원가입</span>
        </S.Join>
        <S.Button onClick={handleSubmit}>
          <ButtonRound disabled={false} type='submit'>
            로그인
          </ButtonRound>
        </S.Button>
      </S.Bottom>
    </S.Wrapper>
  );
};

export default Login;
