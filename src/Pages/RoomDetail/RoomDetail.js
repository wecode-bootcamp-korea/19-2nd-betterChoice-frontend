import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BottomInfo from './BottomInfo/BottomInfo';
import TopInfo from './TopInfo/TopInfo';
import queryString from 'query-string';
import { API } from '../../config';

const RoomDetail = () => {
  const [detailInfo, setDetailInfo] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const id = params.id;
    const query = queryString.parse(location.search);

    fetch(
      `${API}/hotels/${id}?check_in=${query['check_in']}&check_out=${query['check_out']}`
    )
      .then(res => res.json())
      .then(data => {
        setDetailInfo(data.results);
        setCheckInDate(query['check_in']);
        setCheckOutDate(query['check_out']);
      });
  }, []);

  return (
    <Wrapper>
      <TopInfo data={detailInfo} />
      <BottomInfo
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        data={detailInfo}
      />
    </Wrapper>
  );
};

export default RoomDetail;

const Wrapper = styled.section``;
