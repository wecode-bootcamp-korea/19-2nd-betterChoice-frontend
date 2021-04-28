import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

function Login() {
  const [loginInput, setLoginInput] = useState({
    id: '',
    pw: '',
  });

  const idInput = e => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const pwInput = e => {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  };

  const history = useHistory();
  const goToSignUp = () => {
    history.push({ pathname: '/join/signUp' });
  };

  const goToLogin = () => {
    fetch(`${API}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: loginInput.id,
        password: loginInput.pw,
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('res확인하기');
        console.log(res);
        console.log();
        if (res['MESSAGE'] === 'SUCCESS') {
          alert('로그인 완료 :)');
          localStorage.setItem(
            'ACCESS_TOKEN',
            JSON.stringify(res['ACCESS_TOKEN'])
          );
          localStorage.setItem('NICKNAME', JSON.stringify(res['NICKNAME']));
          history.push('/');
        }
        if (res['MESSAGE'] === 'KEY_ERROR') {
          alert('아이디 또는 비밀번호를 입력해주세요.');
        }
        if (res['MESSAGE'] === 'EMAIL_TYPE_ERROR') {
          alert('아이디를 입력해주세요.');
        }
        if (res['MESSAGE'] === 'PASSWORD_TYPE_ERROR') {
          alert('비밀번호를 입력해주세요.');
        }
        if (res['MESSAGE'] === 'INVALID_EMAIL') {
          alert('존재하지 않는 ID입니다.');
        }
        if (res['MESSAGE'] === 'INVALID_PASSWORD') {
          alert('비밀번호를 확인해주세요.');
        }
        if (res['MESSAGE'] === 'JSON_DECODE_ERROR') {
          console.log('JSON으로 보냈니?');
        }
      });
  };

  function kakaLogin() {
    window.Kakao.Auth.login({
      scope: 'profile,account_email,gender,birthday',
      success: function (response) {
        fetch(`${API}/users/kakao-signin`, {
          method: 'POST',
          headers: {
            Authorization: response.access_token,
          },
        })
          .then(res => res.json())
          .then(res => {
            console.log(res);
            window.localStorage.setItem('access_token', res.TOKEN);
            history.push('/');
          });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  return (
    <Wrapper>
      <Title>
        <Link to="/">
          <img className="logo" src="/images/logo/logo.png" alt="logo" />
        </Link>
      </Title>

      <Kakao onClick={kakaLogin}>
        <img src="/images/logo/kakao_login.png" alt="kakaoLogin" />
      </Kakao>

      <LoginBetter>
        <Divide></Divide>
        <InputDiv>
          <Input
            onChange={idInput}
            type="email"
            placeholder="이메일 주소"
            name="id"
          ></Input>
          <Input
            onChange={pwInput}
            type="password"
            placeholder="비밀번호"
            name="pw"
          ></Input>
        </InputDiv>
        <LoginBtn onClick={goToLogin}>로그인</LoginBtn>
        <ToSignUP onClick={goToSignUp}>회원가입</ToSignUP>
      </LoginBetter>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.section`
  ${props => props.theme.flexVertical};
  align-items: center;

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
`;

const Kakao = styled.div`
  margin-top: 30px;
  background: none;

  img {
    width: 450px;
  }
`;

const LoginBetter = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Divide = styled.p`
  &::after {
    content: '';
    position: absolute;
    top: 30px;
    width: 450px;
    height: 1px;
    background: rgba(0, 0, 0, 0.09);
  }
`;
// ss
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 70px 0 30px 0;
`;

const Input = styled.input`
  padding: 0 12px;
  margin-bottom: 30px;
  width: 450px;
  height: 70px;
  border: 1px solid ${props => props.theme.borderGray};
  font-size: 24px;
  cursor: text;
  border-radius: 6px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.middleGray};
    font-size: 20px;
  }
`;

const LoginBtn = styled.button`
  width: 450px;
  height: 70px;
  background-color: ${props => props.theme.mainColor};
  border-radius: 6px;
  font-size: 23px;
  color: white;
`;

const ToSignUP = styled.button`
  color: black;
  background: none;
  text-decoration: none;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
`;
