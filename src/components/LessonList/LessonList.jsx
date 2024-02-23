import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import React from 'react';
import { useNavigate } from 'react-router';
import { useGetLessons, useDeleteLesson, } from '../../api/lesson';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';
import { LessonCard } from '../LessonCard';
import { LessonListStyled } from './LessonListStyled';

export const LessonList = () => {
  const navigate = useNavigate();
  const { deleteLesson } = useDeleteLesson();
  const { loading, getLessons } = useGetLessons();
  const { lessons } = useSelector((state) => state.lessonData);

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteLesson(id);
    await getLessons();
  };

  return (
    <LessonListStyled>
      <Grid>
        {loading
          ? (
            <GridRow>
              <GridColumn width={16}>
                <Loader />
              </GridColumn>
            </GridRow>
          )
          : (
            <GridRow>
              {lessons?.map((item) => (
                <GridColumn className="cards-grid">
                  <LessonCard
                    item={item}
                    onClick={handleClick}
                    onDelete={handleDelete}
                  />
                </GridColumn>
              ))}
            </GridRow>
          )}
      </Grid>
    </LessonListStyled>
  );
};
