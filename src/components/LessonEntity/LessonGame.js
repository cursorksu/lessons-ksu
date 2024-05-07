import { FormField, Popup } from 'semantic-ui-react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { ReactComponent as PrintIcon } from '../../assets/print.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { useNavigate, useParams } from 'react-router';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useReactToPrint } from 'react-to-print';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import Editor from '../TextEditor';
import { HTMLRenderer } from '../HTMLRender/HTMLRender';
import {
  useAssignEntityToLesson
} from '../../api/refs/useAssignEntityToLesson';
import { KsuCard } from '../KsuCard';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { DynamicList } from '../DynamicList/DynamicList';
import { KsuDropdownDynamic } from '../KsuDropdown/KsuDropdownDynamic';
import { KsuDropdown } from '../KsuDropdown';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { Test } from '../../Games/Test/Test';
import clsx from 'clsx';
import {
  MillionerLink, SelectedGamesStyled
} from '../../Games/Test/TestGameViewStyled';
import { BibleTextLink } from '../../Games/BibleText/BibleTextStyled';
import { BibleTextSettings } from '../../Games/BibleText/BibleTextSettings';

export const LessonGame = ({ entityName, lesson }) => {
  const { lessonId } = useParams();
  const { getAllEntities } = useGetAllEntities('game');
  const { createEntity } = useCreateEntity(entityName);
  const { editEntity } = useEditEntity('lessons');
  const [games, setGames] = useState([]);
  const { addEntityToArrayField, removeEntityFromArrayField } = useAssignEntityToLesson(entityName);
  const navigation = useNavigate();

  const {control, getValues, setValue, reset} = useForm({
    defaultValues: {
      games: [],
    },
    caches: false
  });

  useEffect(() => {
    getAllEntities().then((list) => {
      setGames(list);
    });
  }, [lesson, entityName]);

  const [selectedGame, setSelectedGame] = useState(null);
  const [isFormShown, setIsFormShown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    // content: () => componentRef.current,
  });

  const handleEntityCreate = async () => {
    const newValue = getValues();
    const id = await createEntity({  text: newValue.text });
    await addEntityToArrayField(entityName, id, lessonId);

    setIsFormShown(false);
    reset({
      text: '',
      material: [],
    });
  };

  const removeEntity = async (entityId) => {
    await removeEntityFromArrayField(entityName, entityId, lessonId);
  };

  const handleCancel = () => {
    reset();
    setIsFormShown(false);
  };

  return (
    <InfoBlockStyled>
      <section className="ksu-content no-margin" ref={componentRef}>
        <aside className="game">
          <div className="game-list">
            {games.length >= 1 && games.map(el => {
              return (
                <div
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
                    disabled={!lesson?.memory?.find(item => item.id === 'test')}
                    onClick={() => navigation('/games/bibleText')}
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
              onSave={(data) => editEntity({
                id: lesson.id,
                memory: [
                  ...lesson?.memory,
                  data,
                ]
              })}
            />
          )}

          {selectedGame?.key === 'bibleText' && (
            <BibleTextSettings
              onSave={(data) => editEntity({
                id: lesson.id,
                memory: [
                  ...lesson?.memory,
                  data,
                ]
              })}
              data={{
                bibleText: lesson?.bibleText,
                bibleQuote: lesson?.bibleQuote,
              }}
            />
          )}
        </section>
      </section>
    </InfoBlockStyled>
  );
};
