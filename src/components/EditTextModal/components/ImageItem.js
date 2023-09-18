import { Draggable } from '@hello-pangea/dnd';
import { BlockWrapperInputStyled } from '../style';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React from 'react';
import { DropzoneField } from '../../Dropzone/DropzoneField';

export const ImageItem = ({ field, index, handleRemove, handleChange }) => {
  return (
    <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
      {(provided) => (
        <BlockWrapperInputStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DropzoneField
            onChange={handleChange}
            field={field}
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
