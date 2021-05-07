import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, useLocation } from 'react-router-dom';
import { queryToString } from '../../../../utils/queryString';
import 'react-dates/initialize';
import moment from 'moment';
import Calendar from '../../../../Components/Calendar/Calendar';
import CountGuest from '../../../../Components/CountGuest/CountGuest';
import styled from 'styled-components';

const Options = ({ starActiveTabHandler }) => {
  const [date, setDate] = useState({ start: null, end: null });
  const [star, setStar] = useState(null);
  const [adult, setAdult] = useState(1);
  const [room, setRoom] = useState(1);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getMainInfo = location.search
      .substr(location.search.indexOf('?') + 1)
      .split('&');

    setDate({
      start: moment(getMainInfo[2].split('=')[1]),
      end: moment(getMainInfo[3].split('=')[1]),
    });

    setAdult(Number(getMainInfo[4].split('=')[1]));
  }, []);

  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ start: startDate, end: endDate });
  };

  const handleChangeOption = () => {
    const getMainInfo = location.search
      .substr(location.search.indexOf('?') + 1)
      .split('&');
    const newObj = {
      category_name: getMainInfo[0].split('=')[1],
      location_name: getMainInfo[1].split('=')[1],
      check_in: moment(date.start).format('YYYY-MM-DD'),
      check_out: moment(date.end).format('YYYY-MM-DD'),
      occupancy: adult,
      sort_type: getMainInfo[5].split('=')[1],
      star: getMainInfo[6].split('=')[1],
    };
    const queryId = queryToString(newObj);
    history.push(`/roomlists${queryId}`);
  };

  const handleInputChange = e => {
    const { value } = e.target;
    setStar(value);
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

  return (
    <Wrapper>
      <Title>날짜</Title>
      <Calendar
        start={date.start}
        end={date.end}
        handleDateChange={handleDateChange}
      />
      <Type>
        <Title>호텔유형</Title>
        {HotelType.map((type, index) => (
          <InputWrap>
            <Label>
              <CheckBox
                key={type.id}
                name={index}
                value={type.name}
                type="checkbox"
                checked={star === type.name}
                onChange={handleInputChange}
                onClick={starActiveTabHandler}
              />
              {type.name}
            </Label>
          </InputWrap>
        ))}
      </Type>
      <Title>인원선택</Title>
      <CountGuest
        room={room}
        adult={adult}
        incrAdultQty={incrAdultQty}
        decrAdultQty={decrAdultQty}
        incrRoomQty={incrRoomQty}
        decrRoomQty={decrRoomQty}
      />
      <Button onClick={handleChangeOption}>검색하기</Button>
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
  {
    id: 4,
    name: '2성급',
  },
  {
    id: 5,
    name: '1성급',
  },
];

const Wrapper = styled.aside`
  position: sticky;
  top: 0;
  width: 430px;
  height: 670px;
  margin-right: 30px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 5px;
`;

const Title = styled.div`
  font-size: 20px;
  margin-bottom: 18px;
  font-weight: 500;
`;

const Type = styled.div`
  padding: 30px 0;
  margin: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.boxGray};
  border-bottom: 1px solid ${({ theme }) => theme.boxGray};
`;

const InputWrap = styled.div`
  margin: 10px;
`;

const CheckBox = styled.input`
  margin-right: 10px;
  transform: ${({ checkbox }) => checkbox || 'scale(1.4)'};
  -webkit-appearance: none;
  border: 1px solid ${({ theme }) => theme.boxGray};
  padding: 5px;
  border-radius: 50px;
  position: relative;
  background-color: ${({ checked, theme }) => checked && theme.mainColor};
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 18px;
  padding: 7px 0;
  color: ${({ theme }) => theme.fontGray};
`;

const Button = styled.button`
  margin-top: 30px;
  width: 380px;
  height: 50px;
  border-radius: 5px;
  outline: none;
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: ${({ theme }) => theme.white};
  background-color: ${({ theme }) => theme.mainColor};
`;
