import { React } from 'react';
import styled from 'styled-components';

const FilterInfo = ({
  selectedCategory,
  activeTabHandler,
  categoryActiveTab,
}) => {
  return (
    <Wrapper>
      <Category>
        <SearchResult>
          <span>{selectedCategory}</span>으로 검색된 숙소
        </SearchResult>
        {FILTER_CATEGORY.map((category, index) => {
          return (
            <FilterCategory
              name={index}
              key={index}
              color={categoryActiveTab === index}
              onClick={activeTabHandler}
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

const FILTER_CATEGORY = ['추천순', '평점순', '낮은 가격순', '높은 가격순'];

const Wrapper = styled.section`
  margin: 5px auto;
`;

const Category = styled.ul`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const FilterCategory = styled.li`
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border: 1px solid ${({ theme }) => theme.boxGray};
  border-radius: 4px;
  padding-bottom: 10px;
  color: ${({ color, theme }) => (color ? theme.white : '#333')};
  background-color: ${({ color, theme }) =>
    color ? theme.mainColor : theme.white};
  font-weight: ${({ color, theme }) => theme.fontWeightBold};
  font-size: calc(${({ theme }) => theme.fontSize}*0.9);
  cursor: pointer;
`;

const SearchResult = styled.span`
  margin-right: 180px;
  font-size: ${({ theme }) => theme.fontSizeMedium};
  font-weight: ${({ theme }) => theme.fontWeightBold};
  color: #333;
  span {
    font-size: calc(${({ theme }) => theme.fontSizeMedium}*1.8);
  }
`;
