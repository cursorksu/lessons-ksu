import React, { useCallback, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useSelector } from 'react-redux';
import { useCreateGame, useGetGameById } from '../../../api/game';
import { CreateModal } from '../../CreateModal';
import { EditModal } from '../../EditModal';
import { Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../../ButtonStyled';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { EntityToPrint } from '../../ComponentsToPrint';

export const TabPanelGame = ({ value, show, lesson }) => {
  const componentRef = useRef();
  const { createGame } = useCreateGame();
  const { getGameById } = useGetGameById();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect( () => {
    if (lesson?.game && Array.isArray(lesson?.game)) {
      lesson?.game
        .forEach(async (item) => await getGameById(item));
    }
  }, [lesson,  getGameById]);

  const { game } = useSelector((state) => state.lessonData);

  const handleAddGame = useCallback(async (craftFormData) => {
    return await createGame(lesson?.id, craftFormData);
  }, [createGame, lesson]);

  return show
    ? (
      <Box value={value}>
        <div className="btn-wrapper">
          <CreateModal
            onSubmit={handleAddGame}
            buttonText='Додати гру'
            modalTitle='Внести в систему нову гру'
            label='Назва гри'
            placeholder='Введіть назву гри'
            entity='game'
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
        <EntityToPrint ref={componentRef} lesson={lesson} entity={game} entityName={'game'}/>
      </Box>
    )
    : (
      <></>
    );
};
