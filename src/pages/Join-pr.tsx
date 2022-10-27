// 이메일, 비밀번호, 핸드폰, 이름, 닉네임(이메일, 닉네임은 유니크값 확인)

import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

interface MsgType {
  validName: boolean;
  user?: string;
}

const ErrMsg = styled.p<MsgType>`
  visibility: ${(props) => (props.validName ? 'hidden' : 'visible')};
  color: red;
`;

const Join = () => {
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const pwRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const telRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nickRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [email, setEmail] = useState<string>('');
  const [validEmail, setValidEmail] = useState(true);

  const [password, setPassword] = useState<number | null>();
  const [validPw, setValidPw] = useState(true);

  const [tel, setTel] = useState<number>();
  const [validTel, setValidTel] = useState(true);

  const [name, setName] = useState<string>('');
  const [validName, setValidName] = useState(true);

  const [nick, setNick] = useState<string>('');
  const [validNick, setValidNick] = useState(true);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const onChangeEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
    setPassword(Number(e.currentTarget.value));
  };

  const onChangeTel = (e: React.FormEvent<HTMLInputElement>) => {
    setTel(Number(e.currentTarget.value));
  };

  const onChangeName = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onChangeNick = (e: React.FormEvent<HTMLInputElement>) => {
    setNick(e.currentTarget.value);
  };

  return (
    <div>
      <div>
        <span>&lt;</span>
        <h2>회원가입</h2>
        <form>
          <dl>
            <dt>
              <label htmlFor='email'>이메일</label>
            </dt>
            <dd>
              <input
                type='email'
                id='email'
                ref={emailRef}
                autoComplete='off'
                onChange={onChangeEmail}
                required
              />
              <p style={{ visibility: validEmail ? 'hidden' : 'visible' }}>
                올바른 이메일을 입력해주세요.
              </p>
            </dd>
            <dt>
              <label htmlFor='password'>비밀번호</label>
            </dt>
            <dd>
              <input
                type='password'
                id='password'
                ref={pwRef}
                autoComplete='off'
                onChange={onChangePassword}
                required
              />
              <p style={{ visibility: validPw ? 'hidden' : 'visible' }}>
                올바른 비밀번호를 입력해주세요.
              </p>
            </dd>
            <dt>
              <label htmlFor='tel'>핸드폰 번호</label>
            </dt>
            <dd>
              <input
                type='tel'
                id='tel'
                ref={telRef}
                onChange={onChangeTel}
                required
              />
              <p style={{ visibility: validTel ? 'hidden' : 'visible' }}>
                올바른 핸드폰 번호를 입력해주세요.
              </p>
            </dd>
            <dt>
              <label htmlFor='name'>이름</label>
            </dt>
            <dd>
              <input
                type='text'
                id='name'
                ref={nameRef}
                onChange={onChangeName}
                required
              />
              <p style={{ visibility: validName ? 'hidden' : 'visible' }}>
                올바른 이름을 입력해주세요.
              </p>
            </dd>
            <dt>
              <label htmlFor='nick'>닉네임</label>
            </dt>
            <dd>
              <input
                type='nick'
                id='nick'
                ref={nickRef}
                onChange={onChangeNick}
                required
              />
              <p style={{ visibility: validNick ? 'hidden' : 'visible' }}>
                올바른 닉네임을 입력해주세요.
              </p>
            </dd>
          </dl>
        </form>
      </div>
    </div>
  );
};

export default Join;
