import React from 'react';
import styled from 'styled-components';
import Option from './Option/Option';

const ReservationTab = ({ data, checkInDate, checkOutDate }) => {
  return (
    <>
      <ReservationTabWrapper>
        {data.room_type &&
          data.room_type.map((el, idx) => {
            return (
              <Option
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                hotelName={data.hotel_name}
                option={el}
                key={idx}
              />
            );
          })}
      </ReservationTabWrapper>
    </>
  );
};

export default ReservationTab;

const ReservationTabWrapper = styled.ul`
  padding: 20px 0;
`;
