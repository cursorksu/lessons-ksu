import React, {useCallback, useEffect, useState} from 'react';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { MainLayout } from './MainLayout';
import { SprintCard } from '../components/SprintCard/SprintCard';
import {Divider, Grid} from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ButtonStyled } from '../components/ButtonStyled';
import { CreateEntityForm } from '../components/CreateEntityForm/CreateEntityForm';
import { useGetAllEntities } from '../api/entity/useGetAllEntities';
import { getDateFromTimeStep } from '../utils/getDateFromTimeStep';
import { useDeleteEntity } from "../api/entity/useDeleteEntity";

export const Collections = () => {
  const navigate = useNavigate();
  const {collections} = useSelector(store => store);
  const { getAllEntities } = useGetAllEntities('collections');
  const { deleteEntity } = useDeleteEntity('collections', getAllEntities);
  const { t } = useTranslation('tr');

  useEffect( () => {
    getAllEntities().then(() => {});
  }, [getAllEntities]);

  const [isFormShown, setIsFormShown] = useState(false);

  const lessonsHandler = useCallback((e, collectionId) => {
    e.stopPropagation();
    navigate(`${collectionId}${routes.lessons}`);
  }, [navigate]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteEntity(id);
    await getAllEntities();
  };

  const formFields = [
    {
      inputType: 'textInput',
      name: 'title',
      label: 'Collection Title',
      placeholder: `Enter title of the Collection`,
    },
    {
      inputType: 'textInput',
      name: 'description',
      label: 'Collection description',
      placeholder: `Enter description of Collection}`,
    },
    {
      inputType: 'textInput',
      name: 'imageUrl',
      label: 'Image URL',
      placeholder: `Enter image url of Collection`,
    },
    {
      inputType: 'textInput',
      name: 'tags',
      label: 'Tags',
      placeholder: `Use coma to provide few tags`,
    },
  ];

  const defaultValues = {
    description: '',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/lessons-ksu.appspot.com/o/static%2Fplaceholder.png?alt=media&token=cae2b4af-cd76-4178-bdff-d6f986f0cb56',
    title: '',
    tags: '',
    lessonIds: [],
  };

  return (
    <MainLayout>
      <div className="collections-parent-wrapper">
        <div className="topic-title">
          <Grid.Column width={14} ><h1 className="title">{t('collections.collections')}</h1></Grid.Column>
          <Grid.Column width={2}>
            <ButtonStyled
              onClick={() => setIsFormShown(!isFormShown)}>
              + {t('collections.createCollection')}
            </ButtonStyled>
          </Grid.Column>
        </div>
        <Divider/>
        {
          isFormShown && (
            <CreateEntityForm
              defaultValues={defaultValues}
              onConfirm={() => setIsFormShown(!isFormShown)}
              onCancel={() => setIsFormShown(false)}
              entityName={'collections'}
              fields={formFields}
            />
          )
        }
        <div className="collections-wrapper">
          {collections?.length > 0 && collections.map(el => (
            <SprintCard
              modalTitle={'collections.deleteCollection'}
              modalContent={'modal.collectionDelete'}
              onDelete={(e) => handleDelete(e, el.id)}
              onClick={(e) => lessonsHandler(e, el.id)}
              img={el?.imageUrl}
              titleHover={el.title}
              id={el.id}
            >
              <div>
                <div><span className="meta">{getDateFromTimeStep(el.createdAt)}</span></div>
                <div><span className="meta">{el.createdBy.name}</span></div>
              </div>
              <div>
                <hr/>
                <div><span className="meta description">{el.description}</span></div>
                <h3 className="title" title={el.title}>{el.title}</h3>
              </div>
            </SprintCard>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
