import { Draggable } from '@hello-pangea/dnd';
import { BlockWrapperInputStyled } from '../style';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as RemoveIcon } from '../../../assets/minus.svg';
import React, { useEffect, useState } from 'react';
import { InputFieldStyled, InputStyled } from '../../InputStyled';

export const LinkItem = ({
  field,
  index,
  handleRemove,
  handleChange,
  placeholder,
  label,
}) => {
  const [link, setLink] = useState(field.value);
  const [text, setText] = useState(field.text);

  useEffect(() => {
    handleChange({
      value: link,
      text,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, text]);

  return (
    <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
      {(provided) => (
        <BlockWrapperInputStyled
          className='grid'
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <InputFieldStyled>
            <label>{label.value}</label>
            <InputStyled
              name={`${field.type}-value`}
              placeholder={placeholder?.value}
              value={field.value}
              onChange={(e) => setLink(e.target.value)}
            />
          </InputFieldStyled>
          <InputFieldStyled>
            <label>{label.text}</label>
            <InputStyled
              name={`${field.type}-text`}
              placeholder={placeholder?.text}
              value={field.text}
              onChange={(e) => setText(e.target.value)}
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
