import { FormGroup } from '@mui/material';
import { InputStyled, TextareaAutosizeStyled } from '../../InputStyled';
import React from 'react';

export const Topic = ({ field }) => {
  return (
    <FormGroup>
      <InputStyled
        id="quote"
        name="quote"
        placeholder="Місце з Писання"
        value={field.value}
        onChange={field.onChange}
      />
      <TextareaAutosizeStyled
        rows={4}
        id="bible"
        name="bible"
        placeholder="Біблійний текст"
        {...field}
      />
    </FormGroup>
  );
};
