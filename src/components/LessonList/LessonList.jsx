import { GridColumn, GridRow } from 'semantic-ui-react';
import React, { useCallback, useEffect, useMemo } from 'react';
import {useNavigate} from 'react-router';
import { useDeleteLesson, } from '../../api/lesson';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';
import { LessonCard } from '../LessonCard';
import { LessonListStyled } from './LessonListStyled';
import {useLessonToCollection} from "../../api/collections/useLessonToCollection";
import {useGetLessonsInCollection} from "../../api/lesson/useGetLessonsInCollection";
import { routes } from '../../router/constants';

export const LessonList = ({ collection, selectedStatus } ) => {
  const navigate = useNavigate();
  const { deleteLesson } = useDeleteLesson();
  const { unbindLessonFromCollection } = useLessonToCollection();
  const { loading, getLessonsInCollection } = useGetLessonsInCollection();
  const { lessons } = useSelector((state) => state.lessonData);

  useEffect(() => {
    !collection?.lessonIds && navigate(routes.collections);
  }, [collection, getLessonsInCollection, navigate]);

  useEffect(() => {
    collection?.lessonIds && getLessonsInCollection(collection.lessonIds, selectedStatus)
      .then(() => {});
  }, [collection, getLessonsInCollection, selectedStatus]);

  const handleClick = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = useCallback(async (e, id) => {
    e.stopPropagation();
    await unbindLessonFromCollection(collection, id);
    await deleteLesson(id);
  }, [collection, deleteLesson, unbindLessonFromCollection]);

  const filteredLessons =  useMemo(() => {
    // TODO:  Сделать так чтобы пользователь не автор коллекции видел в
    //  одном списке уроки опубликованные и активные своей церкви
    return lessons?.filter(lesson => lesson.status === selectedStatus );
  }, [lessons, selectedStatus]);

  return (
    <LessonListStyled>
      <div className="lessons-grid">
        {loading
          ? (
            <GridRow>
              <GridColumn width={16}>
                <Loader />
              </GridColumn>
            </GridRow>
          )
          : filteredLessons?.map((item) => (
            <div className="cards-grid" key={item.id}>
              <LessonCard
                item={item}
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </div>
          )
          )}
      </div>
    </LessonListStyled>
  );
};
