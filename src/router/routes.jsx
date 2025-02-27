import React from 'react';
import { routes } from './constants';
import { LessonsPage } from '../pages/Lessons';
import { Lesson } from '../pages/Lesson';
import { Cabinet } from '../pages/Cabinet';
import { Collections } from '../pages/Collections';
import { Home } from '../pages/Home';
import { ChurchesList } from '../components/ChurchesList';
import { GroupItem } from '../components/GroupItem';
import { Scenario } from '../components/Scenario';
import { ScenarioItem } from '../components/ScenarioItem';
import { Test } from '../Games/Test/Test';
import { TestGameView } from '../Games/Test/TestGameView';
import { LessonEntityList } from '../components/LessonEntity/LessonEntityList';
import { Rate } from '../Games/Rate/Rate';
import { VeremChurch } from '../components/VeremChurch/VeremChurch';
import { Invite } from '../pages/Invite';

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
    component: <VeremChurch />,
  },
  {
    path: `${routes.church}/:churchId/invite/:inviteId`,
    title: 'Church',
    component: <Invite />,
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
    component: <LessonEntityList entityName={'subject'} />,
  },
  {
    path: routes.food,
    title: 'Food',
    component: <LessonEntityList entityName={'food'} />,
  },
  {
    path: routes.memory,
    title: '<Memory>',
    component: <LessonEntityList entityName={'memory'} />,
  },
  {
    path: routes.creativity,
    title: 'Creativity',
    component: <LessonEntityList entityName={'creative'} />,
  },
  {
    path: routes.game,
    title: 'Game',
    component: <LessonEntityList entityName={'activeGame'} />,
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
    path: `${routes.group}/:groupId${routes.games}/rate`,
    title: 'Rate',
    component: <Rate />,
  },
];
