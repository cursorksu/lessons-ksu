import React from 'react';
import { LessonList } from '../components/LessonList';
import { MainLayout } from './MainLayout';
import { CreateLessonModal } from '../components/CreateLessonModal';
import { useCreateLesson, useGetLessons } from '../api/lesson';
import { Divider } from 'semantic-ui-react';

export const LessonsPage = () => {
  const { createLesson } = useCreateLesson();
  const { getLessons } = useGetLessons();

  const handleAddLesson = async (data) => {
    await createLesson(data);
    await getLessons();
  };

  return (
    <MainLayout>
      <div className="topic-title">
        <h1 className="title">Професор Невірченко</h1>
        <CreateLessonModal onSubmit={handleAddLesson} />
      </div>
      <Divider />
      <LessonList />
    </MainLayout>
  );
};
