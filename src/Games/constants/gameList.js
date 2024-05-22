import React from 'react';
import { ReactComponent as GameIcon } from '../../assets/game.svg';
import { ReactComponent as ListIcon } from '../../assets/addList.svg';
export const gameList = [
  {
    id: 1,
    title: 'Scala',
    icon: <GameIcon  />,
  },
  {
    id: 2,
    title: 'Glass',
    icon: <GameIcon  />,
  },
  {
    id: 3,
    title: 'Situations',
    icon: <GameIcon  />,
  },
  {
    id: 3,
    title: 'Test',
    icon: <ListIcon  />,
    link: 'test'
  },
  {
    id: 4,
    title: 'Boxes',
    icon: <ListIcon  />,
    link: 'test'
  },
];
