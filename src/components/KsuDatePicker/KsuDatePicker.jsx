import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { DatePickerStyled } from './style';
import DatePicker from 'react-datepicker';
import { ReactComponent as CalendarIcon } from '../../assets/calendar.svg';

export const KsuDatePicker = ({ selected, onChange, placeholder }) => {
  return (
    <DatePickerStyled>
      <span className="icon">
        <CalendarIcon />
      </span>
      <DatePicker
        placeholderText={placeholder}
        dateFormat="dd.MM.yyy"
        onChange={onChange}
        selected={selected}
        showMonthDropdown
        showYearDropdown
      />
    </DatePickerStyled>
  );
};
