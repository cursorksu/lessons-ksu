import React, { useCallback, useEffect, useRef } from 'react';
import { Popup } from 'semantic-ui-react';
import { useReactToPrint } from 'react-to-print';
import { EditModal } from '../../EditModal';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { FoodToPrint } from '../../ComponentsToPrint';
import { useCreateFood, useGetFoodById } from '../../../api/food';
import { CreateModal } from '../../CreateModal';
import { useSelector } from 'react-redux';

export const TabPanelFood = ({ show, lesson }) => {
  const componentRef = useRef();
  const { createFood } = useCreateFood();
  const { getFoodIdById } = useGetFoodById();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect( () => {
    if (lesson?.food && Array.isArray(lesson?.food)) {
      lesson?.food
        .forEach(async (item) => await getFoodIdById(item));
    }
  }, [lesson,  getFoodIdById]);

  const { food } = useSelector((state) => state.lessonData);

  const handleAddCraft = useCallback(async (craftFormData) => {
    return await createFood(lesson?.id, craftFormData);
  }, [createFood, lesson]);

  return show
    ? (
      <div>
        <div className="btn-wrapper">
          <CreateModal
            onSubmit={handleAddCraft}
            buttonText='Додати частування'
            modalTitle='Створити нову інструкцію виготовлення смаколика'
            label='Назва смаколика'
            placeholder='Введіть назву смаколика'
            entity='food'
          />
          <EditModal fieldName="title" />
          <Popup
            trigger={(
              <ButtonIconStyled onClick={handlePrint}>
                <PrintIcon />
              </ButtonIconStyled>
            )}
            content='Надрукувати цей урок'
          />
        </div>
        <FoodToPrint ref={componentRef} lesson={lesson} food={food}/>
      </div>
    )
    : (
      <></>
    );
};
