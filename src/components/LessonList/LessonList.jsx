import { Grid } from 'semantic-ui-react';
import React from 'react';
import { useNavigate } from 'react-router';
import {
  useGetLessons, useDeleteLesson, useCreateLesson,
} from '../../api/lesson';
import { Loader } from '../Loader';
import { CreateLessonModal } from '../CreateLessonModal';
import { useSelector } from 'react-redux';
import { LessonCard } from '../LessonCard';

export const LessonList = () => {
  const navigate = useNavigate();
  const { deleteLesson } = useDeleteLesson();
  const { loading, getLessons } = useGetLessons();
  const { createLesson } = useCreateLesson();
  const { lessons } = useSelector((state) => state.lessonData);

  const handleAddLesson = async (data) => {
    await createLesson(data);
    await getLessons();
  };

  const handleClick = (id) => {
    navigate(`/lesson/${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteLesson(id);
    await getLessons();
  };

  return (<Grid columns={3} divided>
    <Grid.Row>
      <CreateLessonModal onSubmit={handleAddLesson} />
    </Grid.Row>
    {loading
      ? (<Grid.Row
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Loader />
      </Grid.Row>)
      : (lessons?.map((item) => (
        <Grid.Column>
          <LessonCard
            item={item}
            onClick={handleClick}
            onDelete={handleDelete}
          />
        </Grid.Column>
      )))}
  </Grid>);
};
