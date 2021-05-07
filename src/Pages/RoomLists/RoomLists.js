import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';
import Options from './Component/Options/Options';
import RoomInfo from './Component/RoomInfo/RoomInfo';
import FilterInfo from './Component/FilterInfo/FilterInfo';

const RoomLists = () => {
  const [roomInfoArr, setRoomInfoArr] = useState([]);
  const [categoryActiveTab, setCategoryActiveTab] = useState(0);
  const [starActiveTab, setStarActiveTab] = useState(null);
  const location = useLocation();

  const activeTabHandler = e => {
    setCategoryActiveTab(+e.target.getAttribute('name'));
  };

  useEffect(() => {
    const filterQueryString = location.search;
    fetch(
      `${API}/hotels${filterQueryString}${SORTING_CATEGORY[categoryActiveTab]}`
    )
      .then(res => res.json())
      .then(data => {
        setRoomInfoArr(data.results);
      });
  }, [categoryActiveTab]);

  const starActiveTabHandler = e => {
    setStarActiveTab(+e.target.name);
  };

  useEffect(() => {
    const filterQueryString = location.search;
    fetch(
      `${API}/hotels${filterQueryString}${SORTING_CATEGORY[categoryActiveTab]}&star=${STAR[starActiveTab]}`
    )
      .then(res => res.json())
      .then(data => {
        setRoomInfoArr(data.results);
      });
  }, [starActiveTab]);

  return (
    <RoomlistsWrapper>
      <FilterInfo
        activeTabHandler={activeTabHandler}
        categoryActiveTab={categoryActiveTab}
      />
      <ListsWrapper>
        <Options starActiveTabHandler={starActiveTabHandler} />
        <RoomInfoWrap>
          <RoomInfo roomInfoArr={roomInfoArr} />
        </RoomInfoWrap>
      </ListsWrapper>
    </RoomlistsWrapper>
  );
};

export default RoomLists;

const STAR = ['5', '4', '3', '2', '1'];
const SORTING_CATEGORY = ['1', '2', '3', '4'];

const RoomlistsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const ListsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RoomInfoWrap = styled.div`
  width: 800px;
`;
