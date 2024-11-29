import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useCreateGame, useGetGameById } from '../../../api/game';
import { CreateModal } from '../../CreateModal';
import { TabPane } from 'semantic-ui-react';
import { EntityToPrint } from '../../ComponentsToPrint';

export const TabPanelGame = ({ lesson }) => {
  const componentRef = useRef();
  const { createGame } = useCreateGame();
  const { getGameById } = useGetGameById();

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

  return (
    <TabPane>
      <div className="btn-wrapper">
        <CreateModal
          onSubmit={handleAddGame}
          buttonText='Додати гру'
          modalTitle='Внести в систему нову гру'
          label='Назва гри'
          placeholder='Введіть назву гри'
          entity='game'
        />
      </div>
      <EntityToPrint ref={componentRef} lesson={lesson} entity={game} entityName={'game'}/>
    </TabPane>
  );
};
