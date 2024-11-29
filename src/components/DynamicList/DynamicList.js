import React, { useState, useEffect, useMemo } from 'react';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import { InputStyled } from '../InputStyled';
import { DndItemStyled } from './DndItemStyled';
import { generateId } from '../../utils/generateId';
import { FormField } from 'semantic-ui-react';

export const DynamicList = ({ field, onChangeField }) => {
  const initialItem = useMemo(() => ({ id: generateId(), value: '' }), []);
  const [list, setList] = useState([initialItem]);

  useEffect(() => {
    field.value && setList(field.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onChangeField && onChangeField({ ...field, value: list });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const onChange = (e, id) => {
    setList((prev) => {
      return prev?.map((el) =>
        el?.id === id ? { id, value: e.target.value } : el
      );
    });
  };
  const handleAdd = () => {
    const randomNum = generateId();
    const newItem = { id: randomNum, value: '' };
    setList([...list, newItem]);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (id) => {
    setList((prev) => prev?.filter((el) => el?.id !== id));
  };

  const handleReset = () => {
    setList([initialItem]);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setList((prevCards) => {
      // Создаем копию массива prevCards
      const updatedCards = [...prevCards];
      // Удаляем элемент, который нужно переместить
      const [draggedCard] = updatedCards.splice(result.source.index, 1);
      // Вставляем элемент в новую позицию
      updatedCards.splice(result.destination.index, 0, draggedCard);
      return updatedCards; // Обновляем стейт
    });
  }

  return (
    <FormField>
      <span className="btn-wrapper">
        <ButtonIconStyled onClick={handleAdd}>
          <AddIcon />
        </ButtonIconStyled>
        <ButtonIconStyled onClick={handleReset}>
          <DeleteIcon />
        </ButtonIconStyled>
      </span>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="dnd-list">
          {(provided) => (
            <ul className="dnd-list" {...provided.droppableProps} ref={provided.innerRef}>
              {list?.map((el, index) => {
                return (
                  <Draggable key={index.toString()} draggableId={index.toString()} index={index}>
                    {(provided) => (
                      <DndItemStyled
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <InputStyled
                          id={`${el?.id}`}
                          name={`${el?.id}`}
                          placeholder="Наступний елемент списку"
                          value={el?.value}
                          onChange={(e) => onChange(e, el?.id)}
                          onKeyDown={(e) => handleKeyDown(e, el?.id)}
                        />
                        <ButtonIconStyled
                          className="remove-handle"
                          onClick={() => handleRemove(el?.id)}
                        >
                          <RemoveIcon />
                        </ButtonIconStyled>
                      </DndItemStyled>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </FormField>
  );
};
