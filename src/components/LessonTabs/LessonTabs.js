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

export const LessonTabs = () => {
  const { id } = useParams();
  const { getLessonById } = useGetLessonById();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    getLessonById(id).then((data) => setLesson(data));
  }, [id, getLessonById]);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabStyled sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Тема" value={'1'} />
          <Tab label="Предметный урок" value={'2'} />
          <Tab label="Поделка" value={'3'} />
          <Tab label="Игра" value={'4'} />
          <Tab label="Запоминание" value={'5'} />
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
            <TabPanelCreativity value={'3'} show={value === '3'} />
            <TabPanelGame value={'4'} show={value === '4'} />
            <TabPanelMemory value={'5'} show={value === '5'} />
          </Box>
        </Scrollbars>
      </TabContext>
    </TabStyled>
  );
};
