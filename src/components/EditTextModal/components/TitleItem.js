import { InputFieldStyled, InputStyled } from '../../InputStyled';
import React from 'react';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import { Draggable } from '@hello-pangea/dnd';
import { BlockWrapperInputStyled } from '../style';

export const TitleItem = ({
  field,
  index,
  label,
  placeholder,
  handleRemove,
  handleChange,
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
            <label htmlFor={field.id}>{label}</label>
            <InputStyled
              key={field.id}
              id={field.id}
              name={field.type}
              placeholder={placeholder}
              value={field.value}
              onChange={(e) => handleChange(e.target)}
            />
          </InputFieldStyled>
          <ButtonIconBasisStyled
            className="remove-handle"
            onClick={() => handleRemove(field?.id)}
          >
            <RemoveIcon />
          </ButtonIconBasisStyled>
        </BlockWrapperInputStyled>
      )}
    </Draggable>
  );
};
