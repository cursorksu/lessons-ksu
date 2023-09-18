import React, { useRef } from 'react';
import { Popup } from 'semantic-ui-react';
import { useReactToPrint } from 'react-to-print';
import { EditModal } from '../../EditModal';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { TopicToPrint } from '../../ComponentsToPrint';

export const TabPanelTopic = ({ value, show, lesson }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return show
    ? (
      <div>
        <div className="btn-wrapper">
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
        <TopicToPrint ref={componentRef} lesson={lesson} />
      </div>
    )
    : (
      <></>
    );
};
