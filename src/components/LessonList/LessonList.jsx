import { Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import {
  useGetLessons, useDeleteLesson, useCreateLesson,
} from '../../api/lesson';
import { Loader } from '../Loader';
import { LessonCard } from '../LessonCard';
import { CreateLessonModal } from '../CreateLessonModal';

export const LessonList = () => {
  const navigate = useNavigate();
  const { deleteLesson } = useDeleteLesson();
  const { lessons, loading, getLessons } = useGetLessons();
  const { createLesson } = useCreateLesson();

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

  return (<Grid container rowSpacing={2}>
    <CreateLessonModal onSubmit={handleAddLesson} />
    {loading
      ? (<Grid
        sm={12}
        item
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Loader />
      </Grid>)
      : (lessons?.map((item) => (<Grid
        sm={12}
        item
        key={item?.id}
        sx={{ display: 'flex', alignItems: 'stretch' }}
      >
        <LessonCard
          item={item}
          onClick={handleClick}
          onDelete={handleDelete}
        />
      </Grid>)))}
  </Grid>);
};
