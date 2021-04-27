import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router';
import { API } from '../../config';

const Order = ({}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const history = useHistory();
  const location = useLocation();

  // Option에서 history.push로 받아온 state
  const {
    discount_price,
    room_name,
    hotel_name,
    check_in,
    check_out,
  } = location.state;

  const handleNameInput = e => {
    setName(e.target.value);
  };

  const handleNumInput = e => {
    setPhoneNumber(e.target.value);
  };

  const makeOrder = () => {
    const Authorization = localStorage.getItem('ACCESS_TOKEN');

    fetch(`${API}/reservations`, {
      method: 'POST',
      headers: {
        Authorization: Authorization,
      },
      body: JSON.stringify({
        name: name,
        phone_number: phoneNumber,
        hotel: hotel_name,
        check_in: check_in,
        check_out: check_out,
        room: room_name,
      }),
    })
      .then(response => response.json())
      .then(response => {
        if (response['MESSAGE'] === 'SUCCESS') {
          history.push('/order/orderConfirm');
          alert('예약되었습니다.');
        } else {
          console.log(response);
          alert('예약이 완료되지 않았습니다.');
        }
      });
  };

  return (
    <OrderWrapper>
      <LeftSide>
        <ReservInfo>
          <div className="user_info">
            <div className="title"> 예약자 정보</div>
            <div className="user_name">예약자 이름</div>
            <input
              type="text"
              placeholder="체크인시 필요한 정보입니다."
              value={name}
              name="name"
              onChange={handleNameInput}
            />
            <div className="user_num"> 휴대폰 번호</div>
            <input
              type="text"
              name="number"
              placeholder="체크인시 필요한 정보입니다."
              value={phoneNumber}
              onChange={handleNumInput}
            />
          </div>
        </ReservInfo>
        <PaymentMethod>
          <div className="title"> 결제수단 선택</div>
          <select>
            <option>신용/체크카드</option>
            <option>카카오페이</option>
            <option>네이버페이</option>
            <option>휴대폰결제</option>
          </select>
          {CHECKBOX.map((el, idx) => {
            return (
              <div>
                <input type="checkbox" value={el} key={idx} /> {el}
              </div>
            );
          })}
        </PaymentMethod>
      </LeftSide>
      <RightSide>
        <div className="room_info">
          <div className="title">숙소이름</div>
          <div>{hotel_name}</div>
        </div>
        <div className="room_type">
          <div className="title">객실타입</div>
          <div>{room_name}</div>
        </div>
        <div className="check_in">
          <div className="title">체크인</div>
          <div>{check_in}</div>
        </div>
        <div className="check_out">
          <div className="title">체크아웃</div>
          <div>{check_out}</div>
        </div>
        <div className="total_price">
          <div>총 결제 금액(VAT포함)</div>
          <div className="price">{discount_price.toLocaleString()}원</div>
        </div>
        <div className="message">
          <div>· 해당 객실가는 세금,봉사료가 포함된 금액입니다.</div>
          <div>
            · 결제완료 후 <span>예약자 이름</span>으로 바로 <span>체크인</span>
            하시면 됩니다.
          </div>
        </div>
        <button className="make_reservation" onClick={makeOrder}>
          예약하기
        </button>
      </RightSide>
    </OrderWrapper>
  );
};

export default Order;

const CHECKBOX = [
  '숙소이용규칙 및 취소/환불규정 동의',
  '개인정도 수집 및 이용 동의',
  '개인정보 제 3자 제공 동의',
  '만 14세 이상 확인',
];

const OrderWrapper = styled.div`
  height: 500px;

  display: flex;
  justify-content: space-between;
  max-width: 800px;
  padding: 20px;
  margin: 200px auto;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 80%;
  padding: 10px;
  border: 1px solid ${props => props.theme.borderGray};
`;

const ReservInfo = styled.div`
  .title {
    margin-bottom: 20px;
  }

  .user_name,
  .user_num {
    margin: 10px 0;
  }

  .user_name,
  .user_num {
    color: ${props => props.theme.fontGray};
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid ${props => props.theme.borderGray};
    border-radius: 8px;
    &:focus {
      outline: none;
    }
  }
`;

const PaymentMethod = styled.div`
  select {
    margin: 10px 0;
    padding: 5px 5px;
  }
`;

const RightSide = styled.div`
  padding: 10px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid pink;
  background-color: ${props => props.theme.bgGray};

  .title {
    color: ${props => props.theme.fontGray};
  }

  .check_out {
    padding-bottom: 20px;
    border-bottom: 1px solid ${props => props.theme.borderGray};
  }
  .price {
    color: ${props => props.theme.mainColor};
    font-weight: ${props => props.theme.fontWeightBold};
  }

  .message {
    font-size: 12px;
    color: ${props => props.theme.fontGray};
    span {
      color: ${props => props.theme.mainColor};
    }
  }

  .make_reservation {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.mainColor};
    border-radius: 4px;
    padding: 10px 0;
  }
`;
