import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CreateModal } from '../../CreateModal';
import { TabPane } from 'semantic-ui-react';
import { EntityToPrint } from '../../ComponentsToPrint';
import { useCreateSubject, useGetSubjectById } from '../../../api/subject';

export const TabPanelSubject = ({ lesson }) => {
  const componentRef = useRef();
  const { createSubject } = useCreateSubject();
  const { getSubjectIdById } = useGetSubjectById();

  useEffect(() => {
    if (lesson?.subject && Array.isArray(lesson?.subject)) {
      lesson?.subject.forEach(async (item) => await getSubjectIdById(item));
    }
  }, [lesson, getSubjectIdById]);

  const { subject } = useSelector((state) => state.lessonData);

  const handleAddCraft = useCallback(
    async (craftFormData) => {
      return await createSubject(lesson?.id, craftFormData);
    },
    [createSubject, lesson]
  );

  return (
    <TabPane>
      <div className="btn-wrapper">
        <CreateModal
          onSubmit={handleAddCraft}
          buttonText="Додати предметний урок"
          modalTitle="Створіть структуру Предметного уроку"
          label="Назва уроку"
          placeholder="Введіть назву уроку"
          entity="subject"
        />
      </div>
      <EntityToPrint
        ref={componentRef}
        lesson={lesson}
        entity={subject}
        entityName={'subject'}
      />
    </TabPane>
  );
};
