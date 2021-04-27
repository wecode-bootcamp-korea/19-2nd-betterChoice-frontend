import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../../config';

const OrderConfirm = ({}) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const Authorization = localStorage.getItem('ACCESS_TOKEN');

    fetch(`${API}/reservations`, {
      headers: {
        Authorization: Authorization,
      },
    })
      .then(res => res.json())
      .then(res => setOrderList(res.RESULTS));
  }, []);

  return (
    <OrderConfirmWrapper>
      <div id="title">예약내역</div>
      {orderList &&
        orderList.map(order => {
          return (
            <ContentsWrapper>
              <ImgItem src={order.image_url} alt="order confirm img" />
              <ConfirmData>
                <span className="status">{order.status}</span>
                <Data>
                  <div className="name">{order.hotel}</div>
                  <div className="check_in">
                    <span className="title">체크인</span>
                    <span>{order.check_in}</span>
                  </div>
                  <div className="check_out">
                    <span className="title">체크아웃</span>
                    <span>{order.check_out}</span>
                  </div>
                  <div className="user_name">
                    <span className="title">예약자 이름</span>
                    <span>{order.name}</span>
                  </div>
                  <div className="phone_num">
                    <span className="title">휴대폰 번호</span>
                    <span>{order.phone_number}</span>
                  </div>
                  <div className="price">
                    <span className="title">총 금액(VAT포함)</span>
                    <span id="price">{order.price.toLocaleString()}원</span>
                  </div>
                </Data>
              </ConfirmData>
            </ContentsWrapper>
          );
        })}
    </OrderConfirmWrapper>
  );
};

export default OrderConfirm;

const OrderConfirmWrapper = styled.div`
  max-width: 800px;
  margin: 200px auto;

  #title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .name {
    font-weight: bold;
  }
`;

const ContentsWrapper = styled.div`
  border: 1px solid ${props => props.theme.middleGray};
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
`;

const ImgItem = styled.img`
  flex-basis: 40%;
  width: 200px;
`;

const ConfirmData = styled.div`
  margin-left: 10px;
  padding: 30px 10px;
  flex-basis: 60%;
  .status {
    padding: 5px;
    margin-bottom: 5px;
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.white};
  }
`;

const Data = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;

  .name {
    margin-top: 20px;
    margin-bottom: 40px;
  }

  .check_in,
  .check_out,
  .user_name,
  .phone_num,
  .price {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.fontGray};
    span {
      margin-right: 5px;
    }
  }

  .title {
    font-weight: ${props => props.theme.fontWeightBold};
  }

  #price {
    color: ${props => props.theme.mainColor};
    font-weight: ${props => props.theme.fontWeightBold};
  }
`;
