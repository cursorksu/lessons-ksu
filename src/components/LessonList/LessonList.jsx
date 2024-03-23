import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import React, {useCallback, useEffect} from 'react';
import {useNavigate} from 'react-router';
import { useDeleteLesson, } from '../../api/lesson';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';
import { LessonCard } from '../LessonCard';
import { LessonListStyled } from './LessonListStyled';
import {useLessonToCollection} from "../../api/collections/useLessonToCollection";
import {useGetLessonsInCollection} from "../../api/lesson/useGetLessonsInCollection";

export const LessonList = ({ collection } ) => {
  const navigate = useNavigate();
  const { deleteLesson } = useDeleteLesson();
  const { unbindLessonFromCollection } = useLessonToCollection();
  const { loading, getLessonsInCollection } = useGetLessonsInCollection();
  const { lessons } = useSelector((state) => state.lessonData);

  useEffect(() => {
    getLessonsInCollection(collection.lessonIds).then(() => {});
  }, [collection, getLessonsInCollection]);

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
    await unbindLessonFromCollection(collection, id);
    await deleteLesson(id);
  }, [collection, deleteLesson, unbindLessonFromCollection]);

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
                <GridColumn className="cards-grid" key={item.id}>
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
