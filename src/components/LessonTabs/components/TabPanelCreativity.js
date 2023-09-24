import React, { useCallback, useRef } from 'react';
import { EditModal } from '../../EditModal';
import { Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../../ButtonStyled';
import { CreativityToPrint } from '../../ComponentsToPrint';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { useReactToPrint } from 'react-to-print';
import { useCreateCraft } from '../../../api/craft/useCraft';
import { CreateCraftModal } from '../../CreateCraftModal';

export const TabPanelCreativity = ({ lesson, craft, show }) => {
  const componentRef = useRef();
  const { createCraft } = useCreateCraft();

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
          <CreateCraftModal onSubmit={handleAddCraft} />
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
