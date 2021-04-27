import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

const Option = ({ option, hotelName, checkInDate, checkOutDate }) => {
  const { room_name, discount_price, original_price, image, remain } = option;
  const history = useHistory();

  // 예약하기 클릭 시 예약페이지로 이동 ('/order')
  const goToOrder = () => {
    history.push({
      pathname: '/order',
      state: {
        //Option에서 예약 내역 페이지(Order)에 보낼 정보 담기
        discount_price: discount_price,
        room_name: room_name,
        hotel_name: hotelName,
        check_in: checkInDate,
        check_out: checkOutDate,
      },
    });
  };

  return (
    <OptionWrapper>
      <div className="img_container">
        <img src={image} alt="room img " />
      </div>
      <DataContainer>
        <div className="room_name">{room_name}</div>
        <div className="price">
          <span>가격</span>
          <div>
            <span className="original_price">
              {original_price.toLocaleString()}원
            </span>
            <span className="discount_price">
              {discount_price.toLocaleString()}원
            </span>
          </div>
        </div>
        <button className="reserv_btn" onClick={goToOrder}>
          예약하기
        </button>
      </DataContainer>
    </OptionWrapper>
  );
};

export default Option;

const OptionWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.borderGray};

  .img_container {
    flex-basis: 50%;
    img {
      width: 376px;
      height: 226px;
      border-radius: 4px;
    }
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
  padding: 10px;

  .room_name {
    font-size: 24px;
  }

  .price {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${props => props.theme.borderGray};
    padding-bottom: 20px;

    .original_price {
      color: ${props => props.theme.middleGray};
      text-decoration: line-through;
      margin-right: 6px;
    }

    .discount_price {
      font-weight: ${props => props.theme.fontWeightBold};
    }
  }

  .reserv_btn {
    padding: 10px 0;
    width: 100%;
    font-size: ${props => props.theme.fontSize};
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.mainColor};
    border-radius: 4px;
  }
`;
