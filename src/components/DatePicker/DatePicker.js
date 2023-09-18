import React, { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { Popover } from '@mui/material';
import { DatePickerStyled } from './style';
import DatePicker from 'react-datepicker';
import { InputFieldStyled, InputStyled } from '../InputStyled';

export const LessonsDatePicker = ({ legend, value, onChange, name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef();

  const onChangeDate = (date) => {
    onChange(date);
    setAnchorEl(null);
  };

  const handleAnchorClick = (event) => {
    inputRef && setAnchorEl(event.currentTarget);
  };

  const handleAnchorClose = () => {
    setAnchorEl(null);
  };

  return (
    <DatePickerStyled>
      <InputFieldStyled>
        <label htmlFor={name}>{legend}</label>
        <InputStyled
          ref={inputRef}
          value={
            value
              ? `${new Date(value).toLocaleDateString()}`
              : new Date().toLocaleDateString()
          }
          onClick={handleAnchorClick}
          onChange={onChange}
          name={name}
          id={name}
        />
      </InputFieldStyled>
      <Popover
        onClose={handleAnchorClose}
        open={!!anchorEl}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <DatePicker
          showYearDropdown
          inline
          selected={value}
          onChange={onChangeDate}
        />
      </Popover>
    </DatePickerStyled>
  );
};
