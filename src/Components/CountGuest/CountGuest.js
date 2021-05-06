import React, { useState } from 'react';
import styled from 'styled-components';

const CountNumbox = ({
  adult,
  room,
  incrAdultQty,
  decrAdultQty,
  incrRoomQty,
  decrRoomQty,
}) => {
  const [isToggleBox, setIsToggleBox] = useState(false);

  const handleToggleBox = () => {
    setIsToggleBox(!isToggleBox);
  };
  const closeToggleBox = () => {
    setIsToggleBox(false);
  };
  return (
    <>
      <SearchBox>
        <div onClick={handleToggleBox}>
          <i class="fas fa-bed"></i>
          <span>
            성인 {adult}명 / 객실 {room}개
          </span>
          <i className="fas fa-chevron-down rightDown" />
        </div>
        <SelectQty display={isToggleBox}>
          <SelectAdultTitle>인원선택</SelectAdultTitle>
          <SelectAdultNum>
            <Title>성인</Title>
            <CountBtn>
              <button onClick={decrAdultQty}>-</button>
              {adult}
              <button onClick={incrAdultQty}>+</button>
            </CountBtn>
          </SelectAdultNum>
          <SelectAdultNum>
            <Title>객실</Title>
            <CountBtn>
              <button onClick={decrRoomQty}>-</button>
              {room}
              <button onClick={incrRoomQty}>+</button>
            </CountBtn>
          </SelectAdultNum>
          <UpdateBtn onClick={closeToggleBox}>적용하기</UpdateBtn>
        </SelectQty>
      </SearchBox>
    </>
  );
};

export default CountNumbox;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  margin-right: 15px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 5px;
  font-size: 16px;
  padding-left: 15px;
  cursor: pointer;
  .fas {
    margin-right: 10px;
    color: ${({ theme }) => theme.mainColor};
  }
  span {
    display: inline-block;
    width: 220px;
    font-size: 14px;
    color: ${({ theme }) => theme.fontGray};
  }
  &:hover {
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const SelectQty = styled.div`
  position: absolute;
  display: ${props => (props.display ? 'flex' : 'none')};
  flex-direction: column;
  width: 300px;
  height: 240px;
  margin-top: 320px;
  padding: 20px;
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 4px;
`;

const SelectAdultTitle = styled.div`
  margin: 0px 0px 30px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: ${({ theme }) => theme.fontGray};
`;

const SelectAdultNum = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const Title = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.fontGray};
`;

const CountBtn = styled.div`
  display: flex;
  align-items: center;
  button {
    background: none;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid ${({ theme }) => theme.boxGray};
    color: ${({ theme }) => theme.mainColor};
    font-size: 20px;
    margin: 0px 10px;
    cursor: pointer;
  }
`;

const UpdateBtn = styled.div`
  position: relative;
  text-align: center;
  border-radius: 5px;
  color: white;
  background-color: ${({ theme }) => theme.mainColor};
  width: 80px;
  padding: 10px;
  left: 165px;
  font-size: 13px;
  cursor: pointer;
`;
