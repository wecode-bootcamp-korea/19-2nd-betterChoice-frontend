/*global kakao*/
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Map = ({ lat, lon }) => {
  useEffect(() => {
    mapscript();
  }, [lat, lon]);

  const mapscript = () => {
    // 화면에 지도 구현
    const { kakao } = window;
    console.log(kakao);
    const container = document.getElementById('my_map');
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    //마커 표시될 위치
    let markerPosition = new kakao.maps.LatLng(lat, lon);

    //마커 생성
    let marker = new kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커를 지도 위에 표시
    marker.setMap(map);
  };

  return (
    <MapWrapper>
      <div id="my_map"></div>
    </MapWrapper>
  );
};

export default Map;

const MapWrapper = styled.div`
  border: 3px solid ${props => props.theme.borderGray};
  margin-top: 33px;
  width: 100%;
  height: 70%;

  #my_map {
    width: 100%;
    height: 100%;
  }
`;
