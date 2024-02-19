import { Draggable } from '@hello-pangea/dnd';
import { BlockWrapperInputStyled } from '../style';
import {
  InputFieldStyled,
  TextareaAutosizeStyled
} from '../../InputStyled';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React from 'react';

export const ParagraphItem = ({
  field,
  index,
  label,
  placeholder,
  handleChange,
  handleRemove,
}) => {
  return (
    <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <InputFieldStyled>
            <label htmlFor={field?.id}>{label}</label>
            <TextareaAutosizeStyled
              key={field?.id}
              id={field?.id}
              name={field.type}
              placeholder={placeholder}
              value={field.value}
              onChange={handleChange}
            />
          </InputFieldStyled>


          <ButtonIconStyled
            className="remove-handle"
            onClick={() => handleRemove(field?.id)}
          >
            <RemoveIcon />
          </ButtonIconStyled>
        </BlockWrapperInputStyled>
      )}
    </Draggable>
  );
};
