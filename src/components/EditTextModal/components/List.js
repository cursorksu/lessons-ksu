import { Draggable } from '@hello-pangea/dnd';
import { DynamicList } from '../../DynamicList/DynamicList';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React from 'react';
import { BlockWrapperInputStyled } from '../style';

export const List = ({ field, index, handleChange, handleRemove }) => {
  return (<Draggable key={index.toString()} draggableId={index.toString()} index={index}>
    {(provided) => (
      <BlockWrapperInputStyled
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <DynamicList
          field={field}
          onChangeField={handleChange}
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
