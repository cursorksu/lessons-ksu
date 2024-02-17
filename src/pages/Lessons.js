import React from 'react';
import { GoBackButton } from '../components/GoBackButton';
import { LessonList } from '../components/LessonList';

export const LessonsPage = () => {
  return (
    <>
      <GoBackButton />
      <h1>Передріздвяний спрінт</h1>
      <LessonList />
    </>
  );
};
