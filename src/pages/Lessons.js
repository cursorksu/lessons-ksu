import React, { useCallback, useMemo, useState } from 'react';
import { LessonList } from '../components/LessonList';
import { MainLayout } from './MainLayout';
import { Popup } from 'semantic-ui-react';
import {CreateEntityForm} from "../components/CreateEntityForm/CreateEntityForm";
import {ButtonStyled} from "../components/ButtonStyled";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {useLessonToCollection} from "../api/collections/useLessonToCollection";
import {useGetLessonsInCollection} from "../api/lesson/useGetLessonsInCollection";
import {
  lessonConfig, lessonDefaultValues
} from '../constants/entities/lessonConfig';

export const LessonsPage = () => {
  const { user } = useSelector(state => state.auth);
  const [createFormIsOpen, setCreateFormIsOpen] = useState(false);
  const { collectionId } = useParams();
  const { collections } = useSelector(state => state);
  const { t } = useTranslation('tr');
  const { bindLessonToCollection } = useLessonToCollection();
  const { getLessonsInCollection } = useGetLessonsInCollection();

  const currentCollection = useMemo(() => (
    collections?.length ? collections.find(el => el.id === collectionId) : []
  ), [collectionId, collections]);

  const handleConfirmCreation = useCallback(async (lessonId) => {
    await bindLessonToCollection(currentCollection, lessonId);
    await getLessonsInCollection(currentCollection.lessonIds);

  }, [bindLessonToCollection, getLessonsInCollection, currentCollection]);

  return (
    <MainLayout>
      <div className="herro collection-herro">
        <div className="title-wrapper top-container">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">{currentCollection.title}</h1>
          {user?.uid && (
            <div>
              <Popup
                trigger={(
                  <ButtonStyled
                    onClick={() => setCreateFormIsOpen(!createFormIsOpen)}>
                    + {t('button.createLesson')}
                  </ButtonStyled>
                )}
                content='Створити новий урок'
              />
            </div>
          )}
        </div>
      </div>

      {createFormIsOpen && (
        <CreateEntityForm
          entityName="lessons"
          onConfirm={handleConfirmCreation}
          onClose={() =>setCreateFormIsOpen(false)}
          fields={lessonConfig}
          defaultValues={lessonDefaultValues}
        />
      )}
      <LessonList collection={currentCollection}/>
    </MainLayout>
  );
};
