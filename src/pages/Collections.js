import React, { useEffect, useState } from 'react';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { MainLayout } from './MainLayout';
import { SprintCard } from '../components/SprintCard/SprintCard';
import { Grid } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ButtonStyled } from '../components/ButtonStyled';
import { CreateEntityForm } from '../components/CreateEntityForm/CreateEntityForm';
import { useGetAllEntities } from '../api/entity/useGetAllEntities';
import { getDateFromTimeStep } from '../utils/getDateFromTimeStep';

export const Collections = () => {
  const navigate = useNavigate();
  const {collections} = useSelector(store => store);
  const { getAllEntities } = useGetAllEntities('collections');

  useEffect( () => {
    getAllEntities().then(() => {});
  }, [getAllEntities]);

  const { t } = useTranslation('tr');
  const [isFormShown, setIsFormShown] = useState(false);

  const lessonsHandler = () => {
    navigate(routes.lessons);
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
        {
          isFormShown && <CreateEntityForm onConfirm={() => setIsFormShown(!isFormShown)} entityName={'collections'}/>
        }
        <div className="collections-wrapper">
          {collections?.length > 0 && collections.map(el => (
            <SprintCard onClick={lessonsHandler} img={el?.imageUrl} titleHover={el.title}>
              <div>
                <div><span className="meta">{getDateFromTimeStep(el.createdAt)}</span></div>
                <div><span className="meta">{el.createdBy.name}</span></div>
              </div>
              <div>
                <hr/>
                <div><span className="meta description" alt={el.description}>{el.description}</span></div>
                <h3 className="title" title={el.title}>{el.title}</h3>
              </div>

            </SprintCard>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
