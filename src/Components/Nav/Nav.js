import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

function Nav() {
  const history = useHistory();
  const [nickName, setNickName] = useState('');

  useState(() => {
    if (localStorage.getItem('NICKNAME')) {
      setNickName(localStorage.getItem(['NICKNAME']));
    }
  }, [nickName]);

  const goMyPage = () => {
    history.push('/order/orderConfirm');
  };
  const goToMain = () => {
    history.push('/');
  };
  const [isToken, setIsToken] = useState(false);

  const LogIn = () => {
    setIsToken(!isToken);
    history.push('/login');
  };

  const logOut = () => {
    setIsToken(!isToken);
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('NICKNAME');
  };

  return (
    <Wrapper>
      <Icons>
        <Logo onClick={goToMain}>야,여기어때</Logo>
        <MyPage>
          {localStorage.getItem('ACCESS_TOKEN') && (
            <Reserved onClick={goMyPage}>예약내역</Reserved>
          )}
          {localStorage.getItem('ACCESS_TOKEN') ? (
            <Login onClick={logOut}>로그아웃</Login>
          ) : (
            <Login onClick={LogIn}>로그인</Login>
          )}
          {localStorage.getItem('ACCESS_TOKEN') && (
            <NickName>
              <span>{nickName}</span> 님
            </NickName>
          )}
        </MyPage>
      </Icons>
    </Wrapper>
  );
}

export default Nav;

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100vw;
  height: 96px;
  padding: auto;
  background-color: ${props => props.theme.navColor};
`;

const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 15px 320px;
`;

const Logo = styled.div`
  padding: 20px;
  font-family: 'Black Han Sans', sans-serif;
  font-size: 35px;
  color: white;
  cursor: pointer;
`;

const MyPage = styled.div`
  display: flex;
  font-size: 23px;
  color: white;
`;

const Reserved = styled.div`
  padding: 20px;
  cursor: pointer;
`;

const Login = styled.div`
  padding: 20px;
  margin: 0 20px;
  cursor: pointer;
`;

const NickName = styled.div`
  padding: 20px;
  cursor: default;
  span {
    font-weight: bolder;
  }
`;
