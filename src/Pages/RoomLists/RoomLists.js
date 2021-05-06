import { React, useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { stringToQuery, queryToString } from '../../utils/queryString';
import { API } from '../../config';
import styled from 'styled-components';
import Options from './Component/Options/Options';
import RoomInfo from './Component/RoomInfo/RoomInfo';
import FilterInfo from './Component/FilterInfo/FilterInfo';

const RoomLists = () => {
  const [roomInfoArr, setRoomInfoArr] = useState([]);
  const [categoryActiveTab, setCategoryActiveTab] = useState(0);
  const [starActiveTab, setStarActiveTab] = useState(0);
  const [mainInfo, setMainInfo] = useState({
    category: '',
  });
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const getMainInfo = location.search
      .substr(location.search.indexOf('?') + 1)
      .split('&');
    setMainInfo({
      category: getMainInfo[1].split('=')[1],
    });
  }, []);

  const activeTabHandler = e => {
    setCategoryActiveTab(+e.target.getAttribute('name'));
  };

  const starActiveTabHandler = e => {
    setStarActiveTab(+e.target.name);
  };

  useEffect(() => {
    const queryObject = stringToQuery(location.search);
    const newObj = {
      sort_type: SORTING_CATEGORY[categoryActiveTab],
      star: STAR[starActiveTab],
    };
    const query = queryToString({ ...queryObject, ...newObj });
    history.push(`/roomlists${query}`);
  }, [categoryActiveTab, starActiveTab]);

  useEffect(() => {
    fetch(`${API}/hotels${location.search}`)
      .then(res => res.json())
      .then(data => {
        setRoomInfoArr(data.results);
      });
  }, [location.search]);

  return (
    <RoomlistsWrapper>
      <FilterInfo
        activeTabHandler={activeTabHandler}
        categoryActiveTab={categoryActiveTab}
        selectedCategory={mainInfo.category}
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
  height: 800vh;
  margin: 200px auto;
`;
const ListsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const RoomInfoWrap = styled.div`
  width: 800px;
`;
