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
import { TestGameView } from '../Games/Test/TestGameView';
import { LessonEntity } from '../components/LessonEntity/LessonEntity';

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
    path: `${routes.collections}/:collectionId${routes.lessons}/:lessonId`,
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
    path: `${routes.games}/test-game-view`,
    title: 'Test',
    component: <TestGameView />,
  },
  {
    path: routes.collections,
    title: 'Collections',
    component: <Collections />,
  },
  {
    path: routes.subject,
    title: 'Subject',
    component: <LessonEntity entityName={'subject'} />,
  },
  {
    path: routes.food,
    title: 'Food',
    component: <LessonEntity entityName={'food'} />,
  },
  {
    path: routes.memory,
    title: '<Memory>',
    component: <LessonEntity entityName={'memory'} />,
  },
  {
    path: routes.creativity,
    title: 'Creativity',
    component: <LessonEntity entityName={'creativity'} />,
  },
  {
    path: routes.game,
    title: 'Game',
    component: <LessonEntity entityName={'game'} />,
  },
];
export const authRouts = [
  {
    path: `${routes.cabinet}/:userId${routes.group}/:groupId`,
    title: 'Cabinet',
    component: <Cabinet />,
  },
  {
    path: `${routes.games}/test`,
    title: 'Test',
    component: <Test />,
  },
  {
    path: `${routes.games}`,
    title: 'Games',
    component: <Games />,
  },
];
