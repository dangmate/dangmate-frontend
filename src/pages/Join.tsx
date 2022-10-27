import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface JoinType {
  email: string;
  password: number | string;
  tel: number | string;
  name: string;
  nick: string;
}

const Join = () => {
  const initialValues: JoinType = {
    email: '',
    password: '',
    tel: '',
    name: '',
    nick: ''
  };

  return (
    <>
      <h2>회원가입</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('올바른 이메일 주소가 아닙니다.')
            .required('필수값입니다.'),
          password: Yup.string().min(5).required('필수값입니다'),
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
              </dd>
              <p
                style={{
                  visibility:
                    errors.email && touched.email ? 'visible' : 'hidden'
                }}
              >
                {errors.email}
              </p>

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
