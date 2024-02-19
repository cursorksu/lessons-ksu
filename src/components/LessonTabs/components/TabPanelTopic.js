import React from 'react';
import { TabPane } from 'semantic-ui-react';
import { TopicToPrint } from '../../ComponentsToPrint';

export const TabPanelTopic = ({ lesson, ref }) => {
  return (
    <TabPane>
      <TopicToPrint ref={ref} lesson={lesson} />
    </TabPane>
  );
};
