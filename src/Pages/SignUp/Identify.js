import React, { useState } from 'react';
import styled from 'styled-components';
import Phone from './component/Phone';
import { inputs } from './inputs';

function Identify() {
  const [form, setForm] = useState({
    phoneNum: '',
    identNum: '',
  });

  return (
    <Wrapper>
      <Title>휴대폰 본인 확인</Title>
      <p>원활한 서비스 제공을 위해, 휴대폰 번호를 입력해주세요.</p>
      <Number>
        {inputs.map(input => (
          <Phone inputs={input} form={form} setForm={setForm} key={input.id} />
        ))}
      </Number>
    </Wrapper>
  );
}

export default Identify;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  height: 100vh;
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Number = styled.div`
  margin-top: 30px;
`;
