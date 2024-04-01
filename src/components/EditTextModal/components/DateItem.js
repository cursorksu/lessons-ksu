import { Draggable } from '@hello-pangea/dnd';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React from 'react';
import { BlockWrapperInputStyled } from '../style';
import { KsuDatePicker } from '../../KsuDatePicker/KsuDatePicker';

export const DateItem = ({ field, index, handleChange, handleRemove }) => {
  return (<Draggable key={index.toString()} draggableId={index.toString()} index={index}>
    {(provided) => (
      <BlockWrapperInputStyled
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <KsuDatePicker
          id={field?.id}
          legend={'Дата'}
          value={field.value}
          onChange={(data) => handleChange({
            id: field?.id, value: data, type: field.type,
          })}
        />

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
