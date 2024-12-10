import React, { useCallback, useEffect, useRef } from 'react';
import { TabPane } from 'semantic-ui-react';
import { EntityToPrint } from '../../ComponentsToPrint';
import { useCreateFood, useGetFoodById } from '../../../api/food';
import { CreateModal } from '../../CreateModal';
import { useSelector } from 'react-redux';

export const TabPanelFood = ({ lesson }) => {
  const componentRef = useRef();
  const { createFood } = useCreateFood();
  const { getFoodIdById } = useGetFoodById();

  useEffect(() => {
    if (lesson?.food && Array.isArray(lesson?.food)) {
      lesson?.food.forEach(async (item) => await getFoodIdById(item));
    }
  }, [lesson, getFoodIdById]);

  const { food } = useSelector((state) => state.lessonData);

  const handleAddCraft = useCallback(
    async (craftFormData) => {
      return await createFood(lesson?.id, craftFormData);
    },
    [createFood, lesson]
  );

  return (
    <TabPane>
      <div className="btn-wrapper">
        <CreateModal
          onSubmit={handleAddCraft}
          buttonText="Додати частування"
          modalTitle="Створити нову інструкцію виготовлення смаколика"
          label="Назва смаколика"
          placeholder="Введіть назву смаколика"
          entity="food"
        />
      </div>
      <EntityToPrint
        ref={componentRef}
        lesson={lesson}
        entity={food}
        entityName={'food'}
      />
    </TabPane>
  );
};
