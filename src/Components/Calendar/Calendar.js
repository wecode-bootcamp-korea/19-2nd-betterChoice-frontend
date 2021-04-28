import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './daterangepicker.css';
import moment from 'moment';
import 'moment/locale/ko';

const Calendar = ({ startDate, endDate, handleDateChange }) => {
  const [focusedInput, setFocusedInput] = useState(null);

  return (
    <SearchBox>
      <i className="fas fa-calendar" />
      <StyledDateRangePicker
        startDatePlaceholderText="체크인"
        endDatePlaceholderText="체크아웃"
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={({ startDate, endDate }) =>
          handleDateChange({ startDate, endDate })
        }
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        showClearDates={true}
        displayFormat={() => 'YYYY-MM-DD'}
      />
    </SearchBox>
  );
};

export default Calendar;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  margin-right: 15px;
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.boxGray};
  border-radius: 5px;
  font-size: 16px;
  padding-left: 15px;
  cursor: pointer;
  .fas {
    margin-right: 10px;
    color: ${props => props.theme.mainColor};
  }
  span {
    display: inline-block;
    width: 220px;
    font-size: 14px;
    color: ${props => props.theme.middleGray};
  }
  &:hover {
    border: 1.5px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.15);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

const StyledDateRangePicker = styled(DateRangePicker)`
  .CalendarDay__selected_span {
    border: 1px solid black;
  }
`;
