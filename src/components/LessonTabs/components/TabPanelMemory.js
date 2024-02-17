import React from 'react';
import { TabPane } from 'semantic-ui-react';

export const TabPanelMemory = ({ lesson }) => {
  return (
    <TabPane>
      <h1>Memory</h1>
      {JSON.stringify(lesson)}
    </TabPane>
  );
};
