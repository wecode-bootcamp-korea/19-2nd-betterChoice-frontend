import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import StatusLabel from '../StatusLabel/StatusLabel';
import FilterInfo from '../FilterInfo/FilterInfo';
import styled from 'styled-components';

const RoomInfo = () => {
  const [roomInfoArr, setRoomInfoArr] = useState([]);
  // const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch('/data/RoomListsData.json')
      .then(res => res.json())
      .then(data => {
        setRoomInfoArr(data.results);
      });
  }, []);

  // useEffect(() => {
  //   fetch(`${API}?{SORTING_CATEGORY[activeTab]}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       setRoomInfoArr(data.results);
  //     });
  // }, [activeTab]);

  // const activeTabHandler = e => {
  //   setActiveTab(e.target.name);
  // };

  // goToRoomDetail = id => {
  //   history.push(`/room/detail/${id}`);
  // };

  const countStars = rate => {
    return '★'.repeat(Math.ceil(rate / 2));
  };

  const countComment = rate => {
    const commentMapper = {
      [rate >= 7]: '좋아요',
      [rate >= 8]: '우수해요',
      [rate >= 9]: '최고에요',
    };
    return <span>{commentMapper.true}</span>;
  };

  return (
    <>
      {/* <FilterInfo activeTabHandler={activeTabHandler} /> */}
      <FilterInfo />
      <Wrapper>
        {roomInfoArr.map(data => {
          const {
            id,
            thumbnail_image,
            hotel_review_rate,
            name,
            address,
            star,
            original_price,
            discount_price,
          } = data;

          return (
            <RoomLists key={id}>
              <RoomImg>
                <img src={thumbnail_image} alt="roomImg" />
              </RoomImg>
              <RoomDesc>
                <ul>
                  {star === 5 && (
                    <StatusLabel
                      text="5성급"
                      color={props => props.theme.fiveStars}
                    />
                  )}
                  {star === 4 && (
                    <StatusLabel
                      text="4성급"
                      color={props => props.theme.fourStars}
                    />
                  )}
                  {star === 3 && (
                    <StatusLabel
                      text="3성급"
                      color={props => props.theme.threeStars}
                    />
                  )}

                  <Name>{name}</Name>
                  <Address>{address}</Address>
                  {hotel_review_rate !== null && (
                    <ReviewWrap>
                      <Star>{countStars(hotel_review_rate)}</Star>
                      <ReviewRate>
                        {String(hotel_review_rate).slice(0, 3)}
                      </ReviewRate>
                      <ReviewStatus>
                        {countComment(hotel_review_rate)}
                      </ReviewStatus>
                    </ReviewWrap>
                  )}
                  <RoomPrice>
                    <Price>{original_price.toLocaleString()}원</Price>
                    <DiscountPrice>
                      {discount_price.toLocaleString()}원
                    </DiscountPrice>
                  </RoomPrice>
                </ul>
              </RoomDesc>
            </RoomLists>
          );
        })}
      </Wrapper>
    </>
  );
};

export default withRouter(RoomInfo);

// const SORTING_CATEGORY = [
//   'recommend',
//   'rate',
//   'priceDesc',
//   'priceAsc',
// ];

const Wrapper = styled.section`
  height: 100vh;
`;

const RoomLists = styled.div`
  position: relative;
  display: flex;
  height: 200px;
  margin-bottom: 20px;
  border: 1px solid ${props => props.theme.boxGray};
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const RoomImg = styled.div`
  ${props => props.theme.flexCenter}
  height: 200px;
  img {
    height: 200px;
  }
`;

const RoomDesc = styled.div`
  padding: 20px;
`;

const Name = styled.li`
  margin: 10px 0;
  font-size: ${props => props.theme.fontSizeMedium};
  font-weight: calc(${props => props.theme.fontWeightBold}*0.7);
`;

const Address = styled.li`
  margin-bottom: 50px;
  font-size: 13px;
  color: ${props => props.theme.middleGray};
`;

const ReviewWrap = styled.div`
  margin-top: -10px;
`;
const Star = styled.span`
  display: block;
  margin-bottom: 2px;
  color: ${props => props.theme.yellow};
`;

const ReviewRate = styled.span`
  display: inline-block;
  text-align: center;
  width: 26px;
  height: 19px;
  border-radius: 2px;
  margin-right: 5px;
  font-size: 15px;
  /* color: ${props => props.theme.fontGray}; */
  color: white;
  /* background-color: ${props => props.theme.mainColor}; */
  background-color: #003580;
`;

const ReviewStatus = styled.span`
  display: inline-block;
  margin-top: 10px;
  font-size: 12px;
  color: ${props => props.theme.fontGray};
`;

const RoomPrice = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 20px;
  bottom: 20px;
`;

const Price = styled.li`
  margin-bottom: 10px;
  text-decoration: line-through;
`;

const DiscountPrice = styled.li`
  font-weight: ${props => props.theme.fontWeightBold};
  font-size: ${props => props.theme.fontSizeMedium};
`;
