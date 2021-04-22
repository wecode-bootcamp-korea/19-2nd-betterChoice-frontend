import React, { useState } from 'react';
import styled from 'styled-components';
import ReservationTab from './ReservationTab/ReservationTab';
import ReviewTab from './ReviewTab/ReviewTab';

const BottomInfo = ({ data, checkInDate, checkOutDate }) => {
  const [currentId, setCurrentId] = useState(1);

  const tabHandler = id => {
    setCurrentId(id);
  };

  const TAB_OBJ = {
    1: (
      <ReservationTab
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        data={data}
      />
    ),
    2: <ReviewTab />,
  };
  return (
    <BottomInfoWrapper>
      <ul className="tabs">
        {CATEGORY_ARR.map((category, idx) => {
          return (
            <Tab
              key={idx}
              onClick={() => tabHandler(idx + 1)}
              isClicked={currentId === idx + 1}
            >
              {category}
            </Tab>
          );
        })}
      </ul>
      <div className="contents">{TAB_OBJ[currentId]}</div>
    </BottomInfoWrapper>
  );
};

export default BottomInfo;

const CATEGORY_ARR = ['객실안내/예약', '리뷰'];

const BottomInfoWrapper = styled.div`
  max-width: 1000px;
  padding: 20px;
  margin: 0 auto;

  .tabs {
    display: flex;
    justify-content: flex-start;
    color: ${props => props.theme.middleGray};
    border-bottom: 1px solid ${props => props.theme.borderGray};
  }
`;

const Tab = styled.li`
  margin-right: 30px;
  padding-bottom: 20px;
  cursor: pointer;
  font-weight: ${props => props.theme.fontWeightBold};
  color: ${props =>
    props.isClicked ? props.theme.mainColor : props.theme.middleGray};
  border-bottom: 2px solid
    ${props =>
      props.isClicked ? props.theme.mainColor : props.theme.borderGray};
`;
