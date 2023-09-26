import React, { useCallback, useEffect, useRef } from 'react';
import { EditModal } from '../../EditModal';
import { Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../../ButtonStyled';
import { CreativityToPrint } from '../../ComponentsToPrint';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { useReactToPrint } from 'react-to-print';
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleAddCraft = useCallback(async (craftFormData) => {
    return await createCraft(lesson.id, craftFormData);
  }, [createCraft, lesson]);

  return show
    ? (
      <div>
        <div className="btn-wrapper">
          <CreateModal
            onSubmit={handleAddCraft}
            buttonText='Додати творчу активність'
            modalTitle='Створити нову інструкцію виготовлення саморобки'
            label='Назва саморобки'
            placeholder='Введіть назву саморобки'
            entity='craft'
          />
          <EditModal fieldName="title" />
          <Popup
            trigger={(
              <ButtonIconStyled onClick={handlePrint}>
                <PrintIcon />
              </ButtonIconStyled>
            )}
            content='Надрукувати інструкцію'
          />
        </div>
        <CreativityToPrint
          ref={componentRef}
          lesson={lesson}
          craft={craft}
        />
      </div>
    )
    : (
      <></>
    );
};
