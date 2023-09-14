import { FormGroup } from '@mui/material';
import { InputContrastStyled, TextareaAutosizeStyled } from '../../InputStyled';
import React from 'react';

export const Bible = ({ field }) => {
  return (
    <FormGroup>
      <InputContrastStyled
        id="quote"
        name="quote"
        placeholder="Місце з Писання"
        value={field.value}
        onChange={field.onChange}
      />
      <TextareaAutosizeStyled
        id="bible"
        name="bible"
        placeholder="Біблійний текст"
        {...field}
      />
    </FormGroup>
  );
};
