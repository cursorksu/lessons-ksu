import React, { useCallback, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { CreateModal } from '../../CreateModal';
import { EditModal } from '../../EditModal';
import { Popup, TabPane } from 'semantic-ui-react';
import { ButtonIconStyled } from '../../ButtonStyled';
import { EntityToPrint } from '../../ComponentsToPrint';
import { useCreateSubject, useGetSubjectById } from '../../../api/subject';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';

export const TabPanelSubject = ({ lesson }) => {
  const componentRef = useRef();
  const { createSubject } = useCreateSubject();
  const { getSubjectIdById } = useGetSubjectById();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect( () => {
    if (lesson?.subject && Array.isArray(lesson?.subject)) {
      lesson?.subject
        .forEach(async (item) => await getSubjectIdById(item));
    }
  }, [lesson,  getSubjectIdById]);

  const { subject } = useSelector((state) => state.lessonData);

  const handleAddCraft = useCallback(async (craftFormData) => {
    return await createSubject(lesson?.id, craftFormData);
  }, [createSubject, lesson]);

  return (
    <TabPane>
      <div className="btn-wrapper">
        <CreateModal
          onSubmit={handleAddCraft}
          buttonText='Додати предметний урок'
          modalTitle='Створіть структуру Предметного уроку'
          label='Назва уроку'
          placeholder='Введіть назву уроку'
          entity='subject'
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
      <EntityToPrint
        ref={componentRef}
        lesson={lesson}
        entity={subject}
        entityName={'subject'}
      />
    </TabPane>
  );
};
