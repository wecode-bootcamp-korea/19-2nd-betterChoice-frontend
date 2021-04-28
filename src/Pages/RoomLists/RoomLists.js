import React from 'react';
import styled from 'styled-components';
import Options from './Component/Options/Options';
import RoomInfo from './Component/RoomInfo/RoomInfo';

const RoomLists = () => {
  return (
    <Wrapper>
      <Options />
      <RoomInfoWrap>
        <RoomInfo />
      </RoomInfoWrap>
    </Wrapper>
  );
};

export default RoomLists;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20vh auto;
`;

const RoomInfoWrap = styled.div`
  ${props => props.theme.flexVertical};
  width: 53vw;
  height: 100vh;
`;
