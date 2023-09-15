import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormGroup } from '@mui/material';
import { ButtonIconBasisStyled } from '../ButtonStyled';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { getRandomNumber } from '../../utils/randomizer';
import { DynamicListItem } from '../DynamicListItem/DynamicListItem';
import { InputStyled } from '../InputStyled';

export const DynamicList = ({ field, initialField }) => {
  const initialItem = useMemo(() => ({ id: 1, value: '' }), []);
  const [list, setList] = useState([initialField || initialItem]);

  useEffect(() => {
    initialField && setList(initialField || initialItem);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialField]);
  useEffect(() => {
    field.onChange(list);
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
          <DynamicListItem
            key={index}
            field={el}
            index={index}
            onChange={onChange}
            handleRemove={handleRemove}
            moveItem={moveItem}
          >
            <InputStyled
              id={`${el?.id}`}
              name={`${el?.id}`}
              placeholder="Наступний елемент списку"
              value={el?.value}
              onChange={(e) => onChange(e, el?.id)}
            />
          </DynamicListItem>
        );
      })}
    </FormGroup>
  );
};
