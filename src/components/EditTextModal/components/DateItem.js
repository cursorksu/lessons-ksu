import { Draggable } from '@hello-pangea/dnd';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React from 'react';
import { BlockWrapperInputStyled } from '../style';
import { LessonsDatePicker } from '../../DatePicker/DatePicker';

export const DateItem = ({ field, index, handleChange, handleRemove }) => {
  return (<Draggable key={index.toString()} draggableId={index.toString()} index={index}>
    {(provided) => (
      <BlockWrapperInputStyled
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <LessonsDatePicker
          id={field.id}
          legend={'Дата'}
          value={field.value}
          onChange={(data) => handleChange({
            id: field.id, value: data, type: field.type,
          })}
        />

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
