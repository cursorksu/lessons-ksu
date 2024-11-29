import React, { useEffect, useRef, useState } from 'react';

import { TabStyled } from './styles';
import { useParams } from 'react-router';
import { ReactComponent as PalletIcon } from '../../assets/pallete.svg';
import { ReactComponent as TopicIcon } from '../../assets/topic.svg';
import { ReactComponent as GameIcon } from '../../assets/game.svg';
import { ReactComponent as FoodIcon } from '../../assets/food.svg';
import { ReactComponent as MemoryIcon } from '../../assets/memory.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { Popup, Tab, TabPane } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { ButtonIconStyled } from '../ButtonStyled';
import { useGetEntity } from '../../api/entity/useGetEntity';
import {
  setLesson as setLessonInStore,
} from '../../store/dataReducer';
import { useDispatch, useSelector } from 'react-redux';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import {
  lessonConfig, lessonDefaultValues
} from '../../constants/entities/lessonConfig';
import { LessonEntity } from '../LessonEntity/LessonEntity';
import { TopicToPrint } from '../ComponentsToPrint';
import { LessonMemory } from '../LessonEntity/LessonMemory';
import { KsuStatus } from '../KsuStatus/KsuStatus';

export const LessonTabs = () => {
  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { t } = useTranslation('tr');
  const { getEntityById } = useGetEntity('lessons');
  const {
    lessonData: { lesson },
    auth: { user }
  } = useSelector(state => state);

  useEffect( () => {
    lessonId && getEntityById(lessonId)
      .then((lesson) => dispatch(setLessonInStore(lesson)));
  }, [lessonId, getEntityById, shouldUpdate, dispatch]);

  const handleConfirmCreation = () => {
    setShouldUpdate(prev => !prev);
  };

  const componentRef = useRef();

  const panes = [
    {
      menuItem: { key: 'topic', icon: <TopicIcon />, content: t('lessonTabs.topic') },
      render: () =>
        <TabPane key={'topic'}>
          <TopicToPrint
            ref={componentRef}
            lesson={lesson}
            onChangeConfirm={handleConfirmCreation}
          />,
        </TabPane>
    },
    {
      menuItem: { key: 'subject', icon: <BookmarkIcon />, content: t('lessonTabs.subject') },
      render: () =>
        <TabPane key={'subject'}>
          <LessonEntity entityName={'subject'} lesson={lesson}/>,
        </TabPane>
    },
    {
      menuItem: { key: 'creative', icon: <PalletIcon />, content: t('lessonTabs.creative') },
      render: () =>
        <TabPane key={'creative'}>
          <LessonEntity entityName={'creative'} lesson={lesson}/>
        </TabPane>
    },
    {
      menuItem: { key: 'activeGame', icon: <GameIcon />, content: t('lessonTabs.game') },
      render: () =>
        <TabPane key={'activeGame'}>
          <LessonEntity entityName={'activeGame'} lesson={lesson}/>
        </TabPane>
    },
    {
      menuItem: { key: 'memory', icon: <MemoryIcon />, content: t('lessonTabs.memory') },
      render: () =>
        <TabPane key={'memory'}>
          <LessonMemory entityName={'memory'} lesson={lesson}/>
        </TabPane>
    },
    {
      menuItem: { key: 'food', icon: <FoodIcon />, content: t('lessonTabs.food') },
      render: () =>
        <TabPane key={'food'}>
          <LessonEntity entityName={'food'} lesson={lesson}/>,
        </TabPane>
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState(lesson?.status);
  useEffect(() => {
    setSelectedStatus(lesson?.status);
  }, [lesson]);

  return (
    <div>
      <div className="herro" style={{ backgroundImage: `url("${lesson?.imageUrl}")`}}>
        <div className="title-wrapper top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className='title'>{lesson?.title}</h1>
        </div>
      </div>

      {editFormIsOpen && (
        <CreateEntityForm
          entityName="lessons"
          onConfirm={handleConfirmCreation}
          onClose={() =>setEditFormIsOpen(false)}
          fields={lessonConfig}
          defaultValues={lesson || lessonDefaultValues}
        />
      )}

      <div className="control-panel">
        {user?.uid && lesson?.createdBy?.uid === user?.uid
          ? (
            <KsuStatus
              status={selectedStatus}
              entityName={'lessons'}
              entityId={lessonId}
              onStatusChange={(data) => setSelectedStatus(data)}
            />
          )
          : <div></div>}
        <div>
          {user?.uid && lesson?.createdBy?.uid === user?.uid && (
            <Popup
              trigger={(
                <ButtonIconStyled onClick={() => setEditFormIsOpen(true)}>
                  <EditIcon />
                </ButtonIconStyled>
              )}
              content='Змінити назву та заобаження уроку'
            />
          )}
        </div>
      </div>

      <TabStyled>
        <Tab panes={panes} />
      </TabStyled>
    </div>
  );
};
