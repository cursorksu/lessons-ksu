import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormGroup } from '@mui/material';
import { ButtonIconBasisStyled } from '../ButtonStyled';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ListItem } from './ListItem';
import { getRandomNumber } from '../../utils/randomizer';

export const DynamicList = ({ field, initialField }) => {
  const initialItem = useMemo(() => ({ id: 1, value: '' }), []);
  const [list, setList] = useState([initialField || initialItem]);

  useEffect(() => {
    initialField && setList(initialField || initialItem);
  }, [initialField, initialItem]);

  useEffect(() => {
    field.onChange(list);
  }, [list, field]);

  const onChange = (e, id) => {
    setList((prev) => {
      return prev?.map((el) =>
        el?.id === id ? { id, value: e.target.value } : el,
      );
    });
  };
  const handleAdd = () => {
    const min = 1;
    const max = 10000;
    const randomNum = getRandomNumber(min, max);
    setList((prev) => [...prev, { id: randomNum, value: '' }]);
  };

  const handleRemove = (id) => {
    setList((prev) => prev?.filter((el) => el?.id !== id));
  };

  const handleReset = () => {
    setList([initialItem]);
  };

  const moveItem = useCallback((dragIndex, hoverIndex) => {
    setList((prevCards) => {
      const updatedCards = [...prevCards]; // Создаем копию массива prevCards
      const [draggedCard] = updatedCards.splice(dragIndex, 1); // Удаляем элемент, который нужно переместить
      updatedCards.splice(hoverIndex, 0, draggedCard); // Вставляем элемент в новую позицию
      return updatedCards; // Обновляем стейт
    });
  }, []);

  return (
    <FormGroup>
      <span className="btn-wrapper">
        <ButtonIconBasisStyled onClick={handleAdd}>
          <AddIcon />
        </ButtonIconBasisStyled>
        <ButtonIconBasisStyled onClick={handleReset}>
          <DeleteIcon />
        </ButtonIconBasisStyled>
      </span>

      {list?.map((el, index) => {
        return (
          <ListItem
            key={index}
            field={el}
            index={index}
            onChange={onChange}
            handleRemove={handleRemove}
            moveItem={moveItem}
          />
        );
      })}
    </FormGroup>
  );
};
