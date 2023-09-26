import { useEffect, useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext } from '@mui/lab';
import { Scrollbars } from 'react-custom-scrollbars-2';
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

export const LessonTabs = () => {
  const { id } = useParams();
  const { getLessonById } = useGetLessonById();

  useEffect( () => {
    getLessonById(id);
  }, [id, getLessonById]);

  const { lesson } = useSelector((state) => state.lessonData);

  const [value, setValue] = useState('6');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabStyled sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label={<><TopicIcon /> Тема </>} value={'1'} />
          <Tab label={<><BookmarkIcon /> Предметний урок </>} value={'2'} />
          <Tab label={<><PalletIcon /> Саморобка </>} value={'3'} />
          <Tab label={<><GameIcon /> Гра </>} value={'4'} />
          <Tab label={<><MemoryIcon />Запам'ятовування</>} value={'5'} />
          <Tab label={<><FoodIcon />Смаколик</>} value={'6'} />
        </Tabs>
        <Scrollbars
          style={{
            width: '100%',
            height: 'calc(100vh - 100px)',
            paddingRight: '12px',
          }}
        >
          <Box sx={{ marginRight: '12px' }}>
            <TabPanelTopic value={'1'} show={value === '1'} lesson={lesson} />
            <TabPanelSubject value={'2'} show={value === '2'} />
            <TabPanelCreativity
              value={'3'}
              show={value === '3'}
              lesson={lesson}
            />
            <TabPanelGame value={'4'} show={value === '4'} />
            <TabPanelMemory value={'5'} show={value === '5'} />
            <TabPanelFood
              value={'6'}
              show={value === '6'}
              lesson={lesson}
            />
          </Box>
        </Scrollbars>
      </TabContext>
    </TabStyled>
  );
};
