import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../../config';

function Phone({ inputs, form, setForm }) {
  const history = useHistory();

  const handleInput = event => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const vaildator = (name, value) => {
    if (name === 'phoneNum' && value.length === 11) {
      return true;
    }
    if (name === 'identNum' && value.length === 4) {
      return true;
    }
  };

  const succeed = () => {
    if (inputs.name === 'phoneNum') {
      fetch(`${API}/users/sms-check`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: form.phoneNum,
        }),
      })
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res['MESSAGE'] === 'SUCCESS') {
            alert('인증번호를 전송하였습니다.');
          }
        });
    }
    if (inputs.name === 'identNum') {
      console.log(inputs.name);
      console.log(form.identNum);
      fetch(
        `${API}/users/sms-check?phone_number=${form.phoneNum}&auth_number=${form.identNum}`
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);
          if (res['MESSAGE'] === 'SUCCESS') {
            alert('본인인증 완료');
            history.push('/join/signup');
          } else {
            alert('인증번호를 확인해주세요.');
          }
        });
    }
  };

  return (
    <Section>
      <Title>{inputs.title}</Title>
      <InputBox>
        <Input
          onChange={handleInput}
          name={inputs.name}
          type="text"
          maxLength={inputs.maxLength}
          id={inputs.id}
        />
        <Btn
          onClick={succeed}
          disabled={!vaildator(inputs.name, form[inputs.name])}
          name={inputs.btnName}
          id={inputs.id}
        >
          {inputs.btnName}
        </Btn>
      </InputBox>
    </Section>
  );
}

export default Phone;

const Section = styled.div`
  margin: 5px;
`;

const Title = styled.div`
  margin-bottom: 10px;
`;

const InputBox = styled.div`
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 310px;
  height: 60px;
  padding: 0 12px;
  border: 1px solid ${props => props.theme.borderGray};
  border-radius: 6px;
  font-size: 24px;
  cursor: text;

  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  margin-left: 20px;
  width: 130px;
  height: 60px;
  border-radius: 6px;
  font-size: 18px;
  color: white;
  background-color: ${props =>
    props.disabled ? props.theme.borderGray : props.theme.mainColor};
  &:active {
    opacity: 0.7;
  }
`;
