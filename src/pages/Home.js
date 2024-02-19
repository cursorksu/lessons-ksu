import React from 'react';
import { routes } from '../router/constants';
import { useNavigate } from 'react-router';
import { MainLayout } from './MainLayout';
import { SprintCard } from '../components/SprintCard/SprintCard';
import { Grid, GridColumn, GridRow } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('tr');

  const lessonsHandler = () => {
    navigate(routes.lessons);
  };

  return (
    <MainLayout>
      <Grid className="button-wrapper">
        <GridRow>
          <h1 className="title">{t('collections.collections')}</h1>
        </GridRow>
        <GridRow>
          <GridColumn width={4}>
            <SprintCard onClick={lessonsHandler} img={'https://images.kinorium.com/movie/shot/727339/h280_41276320.jpg'}>
              <h3 className="title">Професор Недовіряйко</h3>
            </SprintCard>
          </GridColumn >
          <GridColumn width={4}>
            <SprintCard onClick={lessonsHandler} img={'https://www.verywellfamily.com/thmb/eYz1jFNmcmYrhS1YcoMHgzvpbEw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Raisinglittlejess2-397852ca5b624d189ea5f65053be4625.jpeg'}>
              <h3 className="title">Pіздвяний спринт</h3>
            </SprintCard>
          </GridColumn>
        </GridRow>
      </Grid>
    </MainLayout>
  );
};
