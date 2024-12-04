import React from 'react';
import { LessonTabs } from '../components/LessonTabs/LessonTabs';
import { MainLayout } from './MainLayout';

export const Lesson = () => {
  return (
    <MainLayout>
      <LessonTabs />
    </MainLayout>
  );
};
