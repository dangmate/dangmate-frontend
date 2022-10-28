import React, { useState } from 'react';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export interface JoinForm {
  email: string;
  password: string | number;
  tel: string | number;
  name: string;
  nick: string;
}

const DuplicateEmailCheck = () => {
  const { values, submitForm } = useFormikContext<JoinForm>() ?? {};
  const [validEmail, setValidEmail] = useState<boolean>(false);

  const checkEmail = async () => {
    const value = await axios.post('/join/email-check', values.email);
    if (await value.data.check) {
      setValidEmail(true);
    } else {
      alert('중복된 아이디입니다.');
    }
  };
  return (
    <>
      {validEmail ? (
        <span>사용 가능한 아이디입니다.</span>
      ) : (
        <button type='button' onClick={checkEmail}>
          중복체크
        </button>
      )}
    </>
  );
};

const Join = () => {
  return (
    <>
      <h2>회원가입</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
          tel: '',
          name: '',
          nick: ''
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('올바른 이메일 주소가 아닙니다.')
            .required('필수값입니다.'),
          password: Yup.string()
            .min(5, '최소 5자 이상입니다')
            .required('필수값입니다'),
          tel: Yup.number().required('필수값입니다'),
          name: Yup.string().required('필수값입니다'),
          nick: Yup.string().required('필수값입니다')
        })}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <dl>
              <dt>
                <label htmlFor='email'>이메일</label>
              </dt>
              <dd>
                <input
                  id='email'
                  type='email'
                  placeholder='이메일을 입력해주세요'
                  {...getFieldProps('email')}
                />
                <p
                  style={{
                    display: errors.email && touched.email ? 'block' : 'hidden'
                  }}
                >
                  {errors.email}
                </p>
                <DuplicateEmailCheck />
              </dd>

              <dt>
                <label htmlFor='password'>비밀번호</label>
              </dt>
              <dd>
                <input
                  id='password'
                  type='password'
                  placeholder='비밀번호'
                  {...getFieldProps('password')}
                />
              </dd>
              <p
                style={{
                  visibility:
                    errors.password && touched.password ? 'visible' : 'hidden'
                }}
              >
                {errors.password}
              </p>

              <dt>
                <label htmlFor='tel'>핸드본 번호</label>
              </dt>
              <dd>
                <input
                  id='tel'
                  type='tel'
                  placeholder='핸드본 번호'
                  {...getFieldProps('tel')}
                />
              </dd>
              <p
                style={{
                  visibility: errors.tel && touched.tel ? 'visible' : 'hidden'
                }}
              >
                {errors.tel}
              </p>

              <dt>
                <label htmlFor='name'>이름</label>
              </dt>
              <dd>
                <input
                  id='name'
                  type='name'
                  placeholder='이름'
                  {...getFieldProps('name')}
                />
              </dd>
              <p
                style={{
                  visibility: errors.name && touched.name ? 'visible' : 'hidden'
                }}
              >
                {errors.name}
              </p>

              <dt>
                <label htmlFor='nick'>닉네임</label>
              </dt>
              <dd>
                <input
                  id='nick'
                  type='nick'
                  placeholder='닉네임'
                  {...getFieldProps('nick')}
                />
              </dd>
              <p
                style={{
                  visibility: errors.nick && touched.nick ? 'visible' : 'hidden'
                }}
              >
                {errors.nick}
              </p>
            </dl>
            <button type='submit'>가입하기</button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Join;
