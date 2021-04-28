import React from 'react';
import styled from 'styled-components';

const FilterInfo = ({ setActiveTab, activeTabHandler }) => {
  // const [currentId, setCurrentId] = useState();

  // const handleColor = index => {
  //   // setCurrentId(index);
  //   setActiveTab(index);
  // };

  return (
    <Wrapper>
      <Category>
        <SearchResult>
          <span>강남</span>으로 검색된 숙소
        </SearchResult>
        {FILTER_CATEGORY.map((category, index) => {
          return (
            <FilterCategory
              name={index}
              key={index}
              color={setActiveTab === index && 'color'}
              onClick={() => activeTabHandler(index)}
            >
              {category}
            </FilterCategory>
          );
        })}
      </Category>
    </Wrapper>
  );
};

export default FilterInfo;

const FILTER_CATEGORY = [
  '・추천순',
  '・평점순',
  '・낮은 가격순',
  '・높은 가격순',
];

const Wrapper = styled.section`
  height: 10vh;
`;

const Category = styled.ul`
  display: flex;
  align-items: baseline;
`;

const FilterCategory = styled.li`
  margin-left: 20px;
  padding-bottom: 10px;
  border-bottom: ${props =>
    props.color && `3px solid ${props => props.theme.mainColor}`};
  color: ${props => props.color && `${props => props.theme.mainColor}`};
  font-weight: ${props =>
    props.color && `${props => props.theme.fontWeightBold}`};
  font-size: calc(${props => props.theme.fontSize}*0.9);
  cursor: pointer;
`;

const SearchResult = styled.span`
  font-size: ${props => props.theme.fontSizeMedium};
  font-weight: ${props => props.theme.fontWeightBold};
  margin-right: auto;
  span {
    font-size: calc(${props => props.theme.fontSizeMedium}*1.5);
  }
`;
