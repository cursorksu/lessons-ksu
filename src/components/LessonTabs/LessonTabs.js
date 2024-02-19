import React, { useEffect, useRef } from 'react';
import { TabPanelTopic } from './components/TabPanelTopic';
import { TabStyled } from './styles';
import { TabPanelCreativity } from './components/TabPanelCreativity';
import { TabPanelSubject } from './components/TabPanelSubject';
import { TabPanelGame } from './components/TabPanelGame';
import { TabPanelMemory } from './components/TabPanelMemory';
import { useParams } from 'react-router';
import { useGetLessonById } from '../../api/lesson';
import { useSelector } from 'react-redux';
import { ReactComponent as PalletIcon } from '../../assets/pallete.svg';
import { ReactComponent as TopicIcon } from '../../assets/topic.svg';
import { ReactComponent as GameIcon } from '../../assets/game.svg';
import { ReactComponent as FoodIcon } from '../../assets/food.svg';
import { ReactComponent as MemoryIcon } from '../../assets/memory.svg';
import { ReactComponent as BookmarkIcon } from '../../assets/bookmark.svg';
import { TabPanelFood } from './components/TabPanelFood';
import { Popup, Tab } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { EditModal } from '../EditModal';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as PrintIcon } from '../../assets/print.svg';
import { useReactToPrint } from 'react-to-print';

export const LessonTabs = () => {
  const { id } = useParams();
  const { t } = useTranslation('tr');
  const { getLessonById } = useGetLessonById();


  useEffect( () => {
    getLessonById(id);
  }, [id, getLessonById]);

  const { lesson } = useSelector((state) => state.lessonData);
  const panes = [
    {
      menuItem: { key: 'topic', icon: <TopicIcon />, content: t('lessonTabs.topic') },
      render: () =>  <TabPanelTopic lesson={lesson} />,
    },
    {
      menuItem: { key: 'subject', icon: <BookmarkIcon />, content: t('lessonTabs.subject') },
      render: () =>  <TabPanelSubject lesson={lesson}/>,
    },
    {
      menuItem: { key: 'creative', icon: <PalletIcon />, content: t('lessonTabs.creative') },
      render: () => <TabPanelCreativity lesson={lesson}/>,
    },
    {
      menuItem: { key: 'game', icon: <GameIcon />, content: t('lessonTabs.game') },
      render: () =>   <TabPanelGame lesson={lesson}/>,
    },
    {
      menuItem: { key: 'memory', icon: <MemoryIcon />, content: t('lessonTabs.memory') },
      render: () =>  <TabPanelMemory lesson={lesson} />,
    },
    {
      menuItem: { key: 'food', icon: <FoodIcon />, content: t('lessonTabs.food') },
      render: () => <TabPanelFood lesson={lesson}/> ,
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <TabStyled>
      <div className="lesson-header">
        <h1 className='title'>{lesson?.title}</h1>
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
      </div>
      <Tab panes={panes} />
    </TabStyled>
  );
};
