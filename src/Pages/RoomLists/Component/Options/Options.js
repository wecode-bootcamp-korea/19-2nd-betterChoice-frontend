import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import 'react-dates/initialize';
import moment from 'moment';
import Calendar from '../../../../Components/Calendar/Calendar';
import CountGuest from '../../../../Components/CountGuest/CountGuest';
import styled from 'styled-components';

const Options = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [adult, setAdult] = useState(1);
  const [room, setRoom] = useState(1);

  const history = useHistory();

  const handleSearchResult = () => {
    const newObj = {
      check_in: moment(startDate).format('YYYY-MM-DD'),
      check_out: moment(endDate).format('YYYY-MM-DD'),
      occupancy: adult,
    };
    const query =
      '?' +
      Object.entries(newObj)
        .map(e => e.join('='))
        .join('&');
    return query;
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const incrAdultQty = () => {
    adult === MAX_ADULT_NUM
      ? alert('코로나 방역지침으로 최대 인원은 4명입니다')
      : setAdult(adult + 1);
  };

  const decrAdultQty = () => {
    adult === MIN_ADULT_NUM
      ? alert('최소 선택 인원은 1명입니다')
      : adult > 1 && setAdult(adult - 1);
  };

  const incrRoomQty = () => {
    room === MAX_ROOM_NUM
      ? alert('최대 9 객실까지 가능합니다.')
      : setRoom(room + 1);
  };

  const decrRoomQty = () => {
    room === MIN_ROOM_NUM
      ? alert('최소 선택 방 개수는 1개입니다')
      : room > 1 && setRoom(room - 1);
  };

  //날짜, 인원별 검색 후 페이지 통신예정
  // const goToList = () => {
  //   history.push('./room/detail', handleSearchResult());
  //   console.log(handleSearchResult());
  // };

  const handleToggle = () => {};
  return (
    <Wrapper>
      <Title>날짜</Title>
      <Calendar
        startDate={startDate}
        endDate={endDate}
        handleDateChange={handleDateChange}
      />
      <Type>
        <Title>호텔유형</Title>
        {HotelType.map((type, index) => (
          <InputWrap>
            <Input
              key={index}
              onChange={() => handleToggle(type.id)}
              type="checkbox"
              checked
            />
            <Label>{type.name}</Label>
          </InputWrap>
        ))}
      </Type>
      <Title>인원선택</Title>
      <CountGuest
        adult={adult}
        room={room}
        incrAdultQty={incrAdultQty}
        decrAdultQty={decrAdultQty}
        incrRoomQty={incrRoomQty}
        decrRoomQty={decrRoomQty}
      />
    </Wrapper>
  );
};

export default withRouter(Options);

const MIN_ADULT_NUM = 1;
const MAX_ADULT_NUM = 4;
const MAX_ROOM_NUM = 9;
const MIN_ROOM_NUM = 1;

const HotelType = [
  {
    id: 1,
    name: '5성급',
  },
  {
    id: 2,
    name: '4성급',
  },
  {
    id: 3,
    name: '3성급',
  },
];

const Wrapper = styled.aside`
  width: 350px;
  height: 450px;
  margin-right: 50px;
  padding: 20px;
  border: 1px solid ${props => props.theme.boxGray};
  border-radius: 5px;
`;

const Title = styled.div`
  margin-bottom: 18px;
  font-weight: 500;
`;

const Type = styled.div`
  padding: 30px 0;
  margin: 20px 0;
  border-top: 1px solid ${props => props.theme.boxGray};
  border-bottom: 1px solid ${props => props.theme.boxGray};
`;

const InputWrap = styled.div`
  margin: 10px;
`;

const Input = styled.input``;

const Label = styled.label`
  margin-left: 5px;
  font-size: 14px;
  color: ${props => props.fontGray};
`;
