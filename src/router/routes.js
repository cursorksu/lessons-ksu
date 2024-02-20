import React from 'react';
import { routes } from './constants';
import { LessonsPage } from '../pages/Lessons';
import { Lesson } from '../pages/Lesson';
import { Games } from '../pages/Games';
import { Cabinet } from '../pages/Cabinet';
import { Collections } from '../pages/Collections';

export const publicRoutes = [
  {
    path: routes.home,
    title: 'Collections',
    component: <Collections />,
  },
  {
    path: `${routes.lessons}`,
    title: 'Lesson list',
    component: <LessonsPage />,
  },
  {
    path: `${routes.lesson}/:id`,
    title: 'Lesson',
    component: <Lesson />,
  },
  {
    path: `${routes.cabinet}/:id`,
    title: 'Lesson',
    component: <Cabinet />,
  },
  {
    path: '*',
    title: 'Games',
    component: <Games />,
  },

];
export const authRouts = [];
