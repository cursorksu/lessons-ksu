import React from 'react';
import { routes } from './constants';
import { LessonsPage } from '../pages/Lessons';
import { Lesson } from '../pages/Lesson';
import { Games } from '../pages/Games';
import { Cabinet } from '../pages/Cabinet';
import { Collections } from '../pages/Collections';
import {Home} from "../pages/Home";
import { ChurchesList } from '../components/ChurchesList';

export const publicRoutes = [
  {
    path: '/',
    title: 'Home',
    component: <Home />,
  },
];
export const authRouts = [
  {
    path: routes.collections,
    title: 'Collections',
    component: <Collections />,
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
    path: `${routes.cabinet}/:userId`,
    title: 'Cabinet',
    component: <Cabinet />,
  },
  {
    path: `${routes.church}`,
    title: 'ChurchList',
    component: <ChurchesList />,
  },
  {
    path: '*',
    title: 'Games',
    component: <Games />,
  },

];
