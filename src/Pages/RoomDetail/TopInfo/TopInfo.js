import React from 'react';
import styled from 'styled-components';
import Map from './Map/Map';
import CarouselSlider from './CarouselSlider/CarouselSlider';

const TopInfo = ({ data }) => {
  const {
    address,
    hotel_name,
    hotel_review_rate,
    hotel_thumbnail_image,
    latitude,
    longitude,
    star,
  } = data;

  return (
    <>
      {data && (
        <EntireWrapper>
          <CarouselSlider imgs={data} />
          <TopInfoWrapper>
            <RoomImg>
              <img src={hotel_thumbnail_image} alt="topinfo data" />
            </RoomImg>
            <MetaData>
              <span className="level">{star}성급</span>
              <span className="name">{hotel_name}</span>
              <div className="satisfaction">
                <span className="point">
                  {parseFloat(hotel_review_rate).toFixed(1)}
                </span>
                {hotel_review_rate >= 9 && (
                  <span className="satisfaction_state">최고에요</span>
                )}
                {hotel_review_rate >= 8 && hotel_review_rate < 9 && (
                  <span className="satisfaction_state">만족해요</span>
                )}
                {hotel_review_rate < 8 && (
                  <span className="satisfaction_state">좋아요</span>
                )}
              </div>
              <div className="address">{address}</div>
              <Map lat={latitude} lon={longitude} />
            </MetaData>
          </TopInfoWrapper>
        </EntireWrapper>
      )}
    </>
  );
};

export default TopInfo;

const EntireWrapper = styled.section`
  margin: 120px auto 10px auto;
`;

const TopInfoWrapper = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
`;

const RoomImg = styled.div`
  flex-basis: 50%;
  margin-right: 10px;
  img {
    width: 100%;
    border-radius: 4px;
  }
`;

const MetaData = styled.div`
  flex-basis: 50%;

  .level {
    padding: 0 5px;
    margin-right: 10px;
    font-size: 18px;
    color: ${props => props.theme.white};
    background-color: #94a0b2;
  }
  .name {
    font-size: 24px;
    font-weight: ${props => props.theme.fontWeightBold};
  }

  .satisfaction {
    padding: 10px 0;
    .point {
      font-size: 12px;
      padding: 0 5px;
      margin-right: 5px;
      color: ${props => props.theme.white};
      background-color: ${props => props.theme.yellow};
      border-radius: 3px;
    }

    .satisfaction_state {
      color: ${props => props.theme.yellow};
      font-size: 14px;
    }
  }

  .address {
    font-size: 14px;
    color: ${props => props.theme.fontGray};
  }
`;
