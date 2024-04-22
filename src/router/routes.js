import React from 'react';
import { routes } from './constants';
import { LessonsPage } from '../pages/Lessons';
import { Lesson } from '../pages/Lesson';
import { Games } from '../pages/Games';
import { Cabinet } from '../pages/Cabinet';
import { Collections } from '../pages/Collections';
import {Home} from "../pages/Home";
import { ChurchesList } from '../components/ChurchesList';
import { Church } from '../components/Church';
import { GroupItem } from '../components/GroupItem';
import { Scenario } from '../components/Scenario';
import { ScenarioItem } from '../components/ScenarioItem';
import { Test } from '../Games/Test/Test';

export const publicRoutes = [
  {
    path: '/',
    title: 'Home',
    component: <Home />,
  },
  {
    path: `${routes.collections}/:collectionId${routes.lessons}`,
    title: 'Lesson list',
    component: <LessonsPage />,
  },
  {
    path: `${routes.collections}/:collectionId${routes.lessons}/:id`,
    title: 'Lesson',
    component: <Lesson />,
  },
  {
    path: `${routes.church}`,
    title: 'ChurchList',
    component: <ChurchesList />,
  },
  {
    path: `${routes.church}/:churchId`,
    title: 'Church',
    component: <Church />,
  },
  {
    path: `${routes.group}/:groupId`,
    title: 'GroupItem',
    component: <GroupItem />,
  },
  {
    path: `${routes.scenario}`,
    title: 'Scenario',
    component: <Scenario />,
  },
  {
    path: `${routes.scenario}/:scenarioId`,
    title: 'ScenarioItem',
    component: <ScenarioItem />,
  },
  {
    path: `${routes.games}`,
    title: 'Games',
    component: <Games />,
  },
  {
    path: `${routes.games}/test`,
    title: 'Test',
    component: <Test />,
  },
];
export const authRouts = [
  {
    path: routes.collections,
    title: 'Collections',
    component: <Collections />,
  },
  {
    path: `${routes.cabinet}/:userId${routes.group}/:groupId`,
    title: 'Cabinet',
    component: <Cabinet />,
  },
];
