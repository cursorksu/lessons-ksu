import React, { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { DatePickerStyled } from './style';
import { InputFieldStyled, InputStyled } from '../InputStyled';

export const LessonsDatePicker = ({ legend, value, onChange, name }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef();
  const handleAnchorClick = (event) => {
    inputRef && setAnchorEl(event.currentTarget);
  };

  return (
    <DatePickerStyled>
      <InputFieldStyled>
        <label htmlFor={name}>{legend}</label>
        <InputStyled
          negative={anchorEl}
          positive={!anchorEl}
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
    </DatePickerStyled>
  );
};
