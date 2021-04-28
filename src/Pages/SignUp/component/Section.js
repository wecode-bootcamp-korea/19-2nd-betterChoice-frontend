import React from 'react';
import styled from 'styled-components';
import Theme from '../../../Styles/Theme';

function Section({ data, form, handleInput, validator }) {
  const { title, name, type, placeholder, warning } = data;

  console.log(form[name]);

  return (
    <Box>
      <Title>{title}</Title>
      <InputBox
        onChange={handleInput}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {form[name] && !validator(form[name]) && <Warning>{warning}</Warning>}
    </Box>
  );
}

export default Section;

const Box = styled.div`
  margin-bottom: 30px;
`;

const InputBox = styled.input`
  width: 100%;
  height: 60px;
  padding: 0 12px;
  border: 1px solid
    ${props => (props.isCorrect ? Theme.fontGray : Theme.borderGray)};
  border-radius: 6px;
  font-size: 24px;
  cursor: text;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${Theme.middleGray};
  }
`;

const Title = styled.div`
  margin-bottom: 20px;
  width: 80%;
  color: ${Theme.fontGray};
  font-size: 20px;
  font-weight: bold;
`;

const Warning = styled.div`
  margin: 7px 0 0 7px;
  font-size: 16px;
  color: red;
`;
