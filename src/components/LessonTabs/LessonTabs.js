import { useEffect } from 'react';
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
import { Tab } from 'semantic-ui-react';

export const LessonTabs = () => {
  const { id } = useParams();
  const { getLessonById } = useGetLessonById();


  useEffect( () => {
    getLessonById(id);
  }, [id, getLessonById]);

  const { lesson } = useSelector((state) => state.lessonData);
  const panes = [
    { menuItem: 'tema', render: () =>  <TabPanelTopic lesson={lesson} /> },
    // { menuItem: <TabStyled><TopicIcon /> Тема </TabStyled>, render: () =>  <TabPanelTopic lesson={lesson} /> },
    // {
    //   menuItem: <TabStyled><BookmarkIcon /> Предметний урок </TabStyled>,
    //   render: () => <TabPanelSubject lesson={lesson}/>,
    // },
    // { menuItem: <TabStyled><PalletIcon /> Саморобка </TabStyled>, render: () => (
    //   <TabPanelCreativity lesson={lesson}/>
    // )},
    // { menuItem: <TabStyled><GameIcon /> Гра </TabStyled>, render: () =>   <TabPanelGame lesson={lesson}/> },
    // { menuItem: <TabStyled><MemoryIcon />Запам'ятовування</TabStyled>, render: () => <TabPanelMemory lesson={lesson}/> },
    // { menuItem: <TabStyled><FoodIcon />Смаколик</TabStyled>, render: () => (
    //   <TabPanelFood lesson={lesson}/>
    // ) },
  ];

  return (
    <Tab panes={panes} />
  );
};
