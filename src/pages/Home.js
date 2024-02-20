import React from 'react';
import { MainLayout } from './MainLayout';
import { Grid, GridRow } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { t } = useTranslation('tr');

  return (
    <MainLayout>
      <Grid className="button-wrapper">
        <GridRow>
          <h1 className="title">{t('collections.collections')}</h1>
        </GridRow>
      </Grid>
    </MainLayout>
  );
};
