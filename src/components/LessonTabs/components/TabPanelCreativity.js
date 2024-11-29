import React, { useCallback, useEffect, useRef } from 'react';
import { TabPane } from 'semantic-ui-react';
import { EntityToPrint } from '../../ComponentsToPrint';
import { useCreateCraft, useGetCraftById } from '../../../api/craft/useCraft';
import { CreateModal } from '../../CreateModal';
import { useSelector } from 'react-redux';

export const TabPanelCreativity = ({ lesson, show }) => {
  const componentRef = useRef();
  const { createCraft } = useCreateCraft();
  const { getCraftIdById } = useGetCraftById();

  useEffect( () => {
    if (lesson?.craft && Array.isArray(lesson?.craft)) {
      lesson?.craft
        .forEach(async (item) => await getCraftIdById(item));
    }
  }, [lesson, getCraftIdById]);

  const { craft } = useSelector((state) => state.lessonData);

  const handleAddCraft = useCallback(async (craftFormData) => {
    return await createCraft(lesson.id, craftFormData);
  }, [createCraft, lesson]);

  return (
    <TabPane>
      <div className="btn-wrapper">
        <CreateModal
          onSubmit={handleAddCraft}
          buttonText='Додати творчу активність'
          modalTitle='Створити нову інструкцію виготовлення саморобки'
          label='Назва саморобки'
          placeholder='Введіть назву саморобки'
          entity='craft'
        />
      </div>
      <EntityToPrint
        ref={componentRef}
        lesson={lesson}
        entity={craft}
        entityName={'craft'}
      />
    </TabPane>
  );
};
