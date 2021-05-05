import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Section from './component/Section';
import { data } from './data';
import { API } from '../../config';
import Modal from './component/Modal';

function SignUp() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
  });

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(!modal);
  };

  const validator = {
    email: email => email.includes('@' && '.com') && email.length > 8,
    password: pw => pw.length >= 8,
    passwordCheck: pwCheck => pwCheck === form.password,
    nickname: name => name.length >= 2,
  };

  const isAllValid = Object.entries(form).every(([k, v]) => validator[k](v));

  const handleInput = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const goToLogin = () => {
    fetch(`${API}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        nickname: form.nickname,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res['MESSAGE'] === 'SUCCESS') {
          openModal();
        }
        if (res['MESSAGE'] === 'INVALID_EMAIL') {
          alert('잘못 된 이메일 형식입니다.');
        }
        if (res['MESSAGE'] === 'INVALID_PASSWORD') {
          alert('잘못된 비밀번호 형식입니다.');
        }
        if (res['MESSAGE'] === 'EMAIL_ALREADY_EXIST') {
          alert('이미 존재하는 이메일입니다.');
        }
        if (res['MESSAGE'] === 'NICKNAME_ALREADY_EXIST') {
          alert('이미 존재하는 닉네임입니다.');
        }
      });
  };

  return (
    <Wrapper>
      <Title>
        <Link to="/">
          <img className="logo" src="/images/logo/logo.png" alt="logo" />
        </Link>
        <div className="sign_up">회원가입</div>
      </Title>
      <Main>
        {data.map((list, idx) => {
          return (
            <Section
              key={idx}
              data={list}
              form={form}
              setForm={setForm}
              handleInput={handleInput}
              validator={validator[list.name]}
            />
          );
        })}
        <Button isActive={isAllValid} onClick={goToLogin} type="submit">
          가입하기
        </Button>
        {modal && <Modal form={form} openModal={openModal} />}
      </Main>
    </Wrapper>
  );
}

export default SignUp;

const Wrapper = styled.section`
  ${({ theme }) => theme.flexCenter}
  flex-direction: column;
  padding: auto;
  width: 100vw;
  height: 100vh;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    width: 170px;
  }

  .sign_up {
    margin: 48px 0 20px 0;
    font-weight: 700;
    font-size: 25px;
  }
`;

const Main = styled.div`
  margin: 12px auto;
  width: 500px;
`;

const Button = styled.button`
  margin-top: 20px;
  width: 100%;
  height: 70px;
  border-radius: 6px;
  font-size: 24px;
  color: white;
  background-color: ${({ isActive, theme }) =>
    isActive ? `${theme.mainColor}` : `${theme.borderGray}`};
`;
