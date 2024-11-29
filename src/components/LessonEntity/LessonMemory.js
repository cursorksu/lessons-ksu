import { Popup } from 'semantic-ui-react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { Test } from '../../Games/Test/Test';
import {
  MillionerLink, SelectedGamesStyled
} from '../../Games/Test/TestGameViewStyled';
import { BibleTextLink } from '../../Games/BibleText/BibleTextStyled';
import { BibleTextSettings } from '../../Games/BibleText/BibleTextSettings';
import { useUpdateMemory } from '../../api/lesson/useUpdateMemory';
import { BoxesSettings } from '../../Games/Boxes/BoxesSettings';
import { BoxesTextLink } from '../../Games/Boxes/BoxesStyled';
export const LessonMemory = ({ entityName, lesson }) => {
  const { getAllEntities } = useGetAllEntities('game');

  const { updateMemory } = useUpdateMemory();
  const [games, setGames] = useState([]);
  const navigation = useNavigate();

  useEffect(() => {
    getAllEntities().then((list) => {
      setGames(list);
    });
  }, [lesson, entityName, getAllEntities]);

  const [selectedGame, setSelectedGame] = useState(null);

  const componentRef = useRef();

  return (
    <InfoBlockStyled>
      <section className="ksu-content no-margin" ref={componentRef}>
        <aside className="game">
          <div className="game-list">
            {games?.length >= 1 && games.map(el => {
              return (
                <div
                  key={el.id}
                  onClick={() => setSelectedGame(el)}
                  className={`game-item ${selectedGame?.key === el.key && 'active'}`}
                >
                  <h2 className="subtitle">{el.title}</h2>
                  <div className="img-wrapper">
                    <img src={el.avatar} alt={el.title} />
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        <section className='content-wrapper game-settings-wrapper'>
          <SelectedGamesStyled className='selected-game'>
            {lesson?.memory?.find(item => item.id === 'test') &&
              <Popup
                closeOnPortalMouseLeave
                openOnTriggerMouseEnter
                trigger={(
                  <MillionerLink
                    disabled={!lesson?.memory?.find(item => item.id === 'test')}
                    onClick={() => navigation('/games/test-game-view')}
                  />
                )}
                content={'Коли тест буде збережено ви зможете перейти в' +
                  ' ігровий простір і побачити результат'}
              />
            }
            {lesson?.memory?.find(item => item.id === 'bibleText') &&
              <Popup
                closeOnPortalMouseLeave
                openOnTriggerMouseEnter
                trigger={(
                  <BibleTextLink
                    disabled={!lesson?.memory?.find(item => item.id === 'bibleText')}
                    onClick={() => navigation('/games/bibleText')}
                  />
                )}
                content={'Коли тест буде збережено ви зможете перейти в' +
                    ' ігровий простір і побачити результат'}
              />
            }
            {lesson?.memory?.find(item => item.id === 'boxes') &&
               <Popup
                 closeOnPortalMouseLeave
                 openOnTriggerMouseEnter
                 trigger={(
                   <BoxesTextLink
                     disabled={!lesson?.memory?.find(item => item.id === 'boxes')}
                     onClick={() => navigation('/games/boxes')}
                   />
                 )}
                 content={'Коли тест буде збережено ви зможете перейти в' +
                  ' ігровий простір і побачити результат'}
               />
            }
          </SelectedGamesStyled>
          {selectedGame?.key === 'test' && (
            <Test
              settings={lesson?.memory?.find(item => item.id === 'test')?.settings}
              onSave={(data) => updateMemory({
                id: lesson.id,
                memory: data,
              })}
            />
          )}

          {selectedGame?.key === 'bibleText' && (
            <BibleTextSettings
              onSave={(data) => updateMemory({
                id: lesson.id,
                memory: data
              })}
              data={{
                bibleText: lesson?.bibleText,
                bibleQuote: lesson?.bibleQuote,
              }}
            />
          )}

          {selectedGame?.key === 'boxes' && (
            <BoxesSettings
              onSave={(data) => updateMemory({
                id: lesson.id,
                memory: data
              })}
              data={lesson?.memory?.find(item => item.id === 'boxes')?.settings}
            />
          )}
        </section>
      </section>
    </InfoBlockStyled>
  );
};
