import React from 'react';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import { Draggable } from '@hello-pangea/dnd';
import { BlockWrapperInputStyled } from '../style';
import { InputFieldStyled } from '../../InputStyled';

export const DividerItem = ({ field, index, handleRemove }) => {
  return (
    <Draggable
      key={index.toString()}
      draggableId={index.toString()}
      index={index}>
      {(provided) => (
        <BlockWrapperInputStyled
          className="divider"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
          <InputFieldStyled>
            <label>Розділювач</label>
            <hr />
          </InputFieldStyled>
          <ButtonIconStyled
            className="remove-handle"
            onClick={() => handleRemove(field?.id)}>
            <RemoveIcon />
          </ButtonIconStyled>
        </BlockWrapperInputStyled>
      )}
    </Draggable>
  );
};
