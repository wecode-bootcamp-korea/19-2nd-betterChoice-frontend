import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { queryToString } from '../../utils/queryString';
import moment from 'moment';
import AccomodationType from './Component/AccomodationType/AccomodationType';
import Location from './Component/Location/Location';
import Calendar from '../../Components/Calendar/Calendar';
import CountGuest from '../../Components/CountGuest/CountGuest';
import styled from 'styled-components';

const Main = () => {
  const [accomoType, setAccomoType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState({ start: null, end: null });
  const [adult, setAdult] = useState(1);
  const [room, setRoom] = useState(1);

  const history = useHistory();

  const goToList = () => {
    const newObj = {
      category_name: accomoType,
      location_name: location,
      check_in: moment(date.start).format('YYYY-MM-DD'),
      check_out: moment(date.end).format('YYYY-MM-DD'),
      occupancy: adult,
    };
    const queryString = queryToString(newObj);
    history.push(`/roomlists${queryString}`);
  };

  const handleDateChange = ({ startDate, endDate }) => {
    setDate({ start: startDate, end: endDate });
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
    <>
      <Wrapper>
        <MainWrap>
          <Header>어떤 숙소 찾으세요? </Header>
          <InfoWrap>
            <AccomodationType
              accomoType={accomoType}
              setAccomoType={setAccomoType}
            />
            <SearchWrap>
              <Location location={location} setLocation={setLocation} />
              <Calendar
                start={date.start}
                end={date.end}
                handleDateChange={handleDateChange}
              />
              <CountGuest
                adult={adult}
                room={room}
                incrAdultQty={incrAdultQty}
                decrAdultQty={decrAdultQty}
                incrRoomQty={incrRoomQty}
                decrRoomQty={decrRoomQty}
              />
              <SearchBtn onClick={goToList}>검색</SearchBtn>
            </SearchWrap>
          </InfoWrap>
          <FooterBox>
            <Footer>취향대로 머물다</Footer>
            <Footer>가까운 곳에서 즐기는 색다른 여행</Footer>
          </FooterBox>
        </MainWrap>
      </Wrapper>
      <RoomTypeWrap>
        <SecondHeader>다양한 숙소를 즐겨보세요</SecondHeader>
        <ImageBox>
          {IMAGES.map((img, index) => {
            return (
              <>
                {index < 2 && (
                  <MainType key={index} src={img.img_url}>
                    {img.name}
                  </MainType>
                )}
              </>
            );
          })}
        </ImageBox>
        <ImageBox>
          {IMAGES.map((img, index) => {
            return (
              <>
                {index >= 2 && (
                  <SubType key={index} src={img.img_url}>
                    {img.name}
                  </SubType>
                )}
              </>
            );
          })}
        </ImageBox>
      </RoomTypeWrap>
    </>
  );
};

export default Main;

const MIN_ADULT_NUM = 1;
const MAX_ADULT_NUM = 4;
const MAX_ROOM_NUM = 9;
const MIN_ROOM_NUM = 1;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  background-image: url('https://images.unsplash.com/photo-1501117716987-c8c394bb29df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
  background-size: cover;
`;

const MainWrap = styled.div`
  margin: 220px auto;
`;

const InfoWrap = styled.div`
  height: 290px;
  padding: 70px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 7px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  background-color: rgb(256, 256, 256, 1);
`;

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 2.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.white};
`;

const SearchWrap = styled.div`
  ${({ theme }) => theme.flexCenter};
  margin-top: 20px;
`;

const SearchBtn = styled.div`
  ${({ theme }) => theme.flexCenter};
  width: 95px;
  height: 50px;
  background-color: ${({ theme }) => theme.mainColor};
  color: ${({ theme }) => theme.white};
  border-radius: 4px;
  outline: none;
  cursor: pointer;
`;

const RoomTypeWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SecondHeader = styled.header`
  width: 1240px;
  margin: 50px 0;
  font-size: 2.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.black};
`;

const ImageBox = styled.div`
  width: 1240px;
  display: flex;
  padding: 30px 0;
`;

const MainType = styled.div`
  width: 610px;
  height: 300px;
  margin-right: 20px;
  padding: 20px;
  background-image: url(${props => props.src});
  background-size: cover;
  font-weight: ${({ theme }) => theme.fontWeightBold};
  font-size: 25px;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
`;

const SubType = styled(MainType)`
  width: 400px;
  height: 300px;
  background-image: url(${props => props.src});
  background-size: cover;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 50px;
`;

const Footer = styled.div`
  font-weight: ${({ theme }) => theme.fontWeightBold};
  margin: 10px 0;
  font-size: 35px;
  color: ${({ theme }) => theme.white};
`;

const IMAGES = [
  {
    img_url:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    name: '호텔',
  },
  {
    img_url:
      'https://images.unsplash.com/photo-1523459231854-ec3ba323a2e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=976&q=80',
    name: '모텔',
  },
  {
    img_url:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    name: '아파트먼트',
  },
  {
    img_url:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=973&q=80',
    name: '게스트하우스',
  },
  {
    img_url:
      'https://images.unsplash.com/photo-1561501878-aabd62634533?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    name: '리조트',
  },
];
