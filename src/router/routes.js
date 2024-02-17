import React from 'react';
import { routes } from './constants';
import { Home } from '../pages/Home';
import { LessonsPage } from '../pages/Lessons';
import { Lesson } from '../pages/Lesson';
import { Games } from '../pages/Games';

export const publicRoutes = [
  {
    path: routes.home,
    title: 'Home',
    component: <Home />,
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
    path: '*',
    title: 'Games',
    component: <Games />,
  },
];
export const authRouts = [];
