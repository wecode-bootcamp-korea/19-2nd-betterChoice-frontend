import React from 'react';
import styled from 'styled-components';

const StatusLabel = ({ color, text }) => {
  return <Label color={color}>{text}</Label>;
};

export default StatusLabel;

const Label = styled.span`
  ${props => props.theme.flexCenter};
  width: 38px;
  height: 19px;
  border-radius: 2px;
  font-size: 13px;
  color: ${props => props.theme.white};
  background-color: ${props => props.color};
`;
