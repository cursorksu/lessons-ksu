import React, {useCallback, useMemo, useState} from 'react';
import { LessonList } from '../components/LessonList';
import { MainLayout } from './MainLayout';
import {Divider, Grid} from 'semantic-ui-react';
import {CreateEntityForm} from "../components/CreateEntityForm/CreateEntityForm";
import {ButtonStyled} from "../components/ButtonStyled";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import {useLessonToCollection} from "../api/collections/useLessonToCollection";
import {useGetLessonsInCollection} from "../api/lesson/useGetLessonsInCollection";

export const LessonsPage = () => {
  const [createFormIsOpen, setCreateFormIsOpen] = useState(false);
  const { collectionId } = useParams();
  const { collections } = useSelector(state => state);
  const { t } = useTranslation('tr');
  const { bindLessonToCollection } = useLessonToCollection();
  const { getLessonsInCollection } = useGetLessonsInCollection();

  const currentCollection = useMemo(() => (
    collections.find(el => el.id === collectionId)
  ), [collectionId, collections]);

  const defaultValues = {
    bible: '',
    description: '',
    goal: '',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fplaceholder.png?alt=media&token=cae2b4af-cd76-4178-bdff-d6f986f0cb56',
    quote: '',
    tags: '',
    title: '',
  };

  const formFields = [
    {
      inputType: 'textInput',
      name: 'title',
      label: 'Lesson Title',
      placeholder: `Enter title of the Lesson`,
    },
    {
      inputType: 'textInput',
      name: 'description',
      label: 'Lesson description',
      placeholder: `Enter description of Lesson}`,
    },
    {
      inputType: 'textInput',
      name: 'imageUrl',
      label: 'Image URL',
      placeholder: `Enter image url of Lesson`,
    },
    {
      inputType: 'textInput',
      name: 'goal',
      label: 'Goal',
      placeholder: `Enter goal of Lesson}`,
    },
    {
      inputType: 'textInput',
      name: 'bible',
      label: 'Place from Bible',
      placeholder: 'Chose place from Bible',
    },
    {
      inputType: 'textInput',
      name: 'quote',
      label: 'Quote from Bible',
      placeholder: 'Add quote',
    },
    {
      inputType: 'textInput',
      name: 'tags',
      label: 'Tags',
      placeholder: `Use coma to provide few tags`,
    },
  ];

  const handleConfirmCreation = useCallback(async (lessonId) => {
    await bindLessonToCollection(collectionId, lessonId);
    await getLessonsInCollection(currentCollection.lessonIds);

  }, [bindLessonToCollection, getLessonsInCollection, currentCollection, collectionId]);

  return (
    <MainLayout>
      <div className="topic-title">
        <Grid.Column width={14}><h1 className="title">{currentCollection.title}</h1></Grid.Column>
        <Grid.Column width={2}>
          <ButtonStyled
            onClick={() => setCreateFormIsOpen(!createFormIsOpen)}>
                      + {t('button.createLesson')}
          </ButtonStyled>
        </Grid.Column>
      </div>
      <Divider/>
      {createFormIsOpen && (
        <CreateEntityForm
          entityName="lessons"
          onConfirm={handleConfirmCreation}
          onClose={() =>setCreateFormIsOpen(false)}
          fields={formFields}
          defaultValues={defaultValues}
        />
      )}
      <LessonList/>
    </MainLayout>
  );
};
