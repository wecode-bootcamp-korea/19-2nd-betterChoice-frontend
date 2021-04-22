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

    // 전달된 url의 id에 해당하는 내용을 fetch get 요청
    //fetch GET API 최종: 'http://10.58.6.199:8000/hotels/1?check_in=2021-05-07&check_out=2021-05-08'
    // 2021-05-07, 2021-05-08 추출해서 -> order -> order confirm에 보내야함
    fetch(
      // `${API}/hotels/${id}?check_in=${query['check_in']}&check_out=${query['check_out']}`
      `http://10.58.6.199:8000/hotels/1?check_in=2021-05-07&check_out=2021-05-08`
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

const Wrapper = styled.section`
  height: 100%;
`;
