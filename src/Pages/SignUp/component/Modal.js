import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Modal({ form }) {
  return (
    <SuccessModal>
      <BackGround></BackGround>
      <ModalWrap className="modal_wrap">
        <Mention>
          <User>'{form.nickname}' 님,</User>
          <Hi>회원가입을 환영합니다! </Hi>
          <Link to="/login">
            <Finish>확인</Finish>
          </Link>
        </Mention>
      </ModalWrap>
    </SuccessModal>
  );
}

export default Modal;

const SuccessModal = styled.div``;

const BackGround = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalWrap = styled.div`
  width: 500px;
  height: 500px;
  padding: 50px;
  position: absolute;
  top: 27%;
  left: 37%;
  background: #eee;
  z-index: 2;
  border-radius: 20px;
`;
const Mention = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  font-size: 30px;
  font-family: 'Do Hyeon', sans-serif;
`;

const User = styled.div`
  margin-bottom: 30px;
`;

const Hi = styled.div`
  color: ${props => props.theme.mainColor};
  margin-bottom: 70px;
`;

const Finish = styled.button`
  width: 100px;
  height: 50px;
  color: white;
  border-radius: 10px;
  background-color: ${props => props.theme.mainColor};
  font-size: 18px;
  font-family: 'Do Hyeon', sans-serif;
  &:active {
    opacity: 0.8;
  }
`;
