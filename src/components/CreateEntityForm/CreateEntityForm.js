import { CreateEntityFormStyled } from './CreateEntityFormStyled';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyled } from '../ButtonStyled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Grid } from 'semantic-ui-react';
import { InputStyled, LabelStyled } from '../InputStyled';

export const CreateEntityForm = ({ entityName, onConfirm }) => {
  const { reset, control, getValues } = useForm();
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');
  return (
    <CreateEntityFormStyled>
      <Controller
        name={'title'}
        control={control}
        render={({ field }) => (
          <FormField>
            <LabelStyled>Title</LabelStyled>
            <InputStyled
              {...field}
              placeholder={`Enter title of ${entityName}`}
            />
          </FormField>
        )}
      />
      <Controller
        name={'description'}
        control={control}
        render={({ field }) => (
          <FormField>
            <LabelStyled>Description</LabelStyled>
            <InputStyled
              {...field}
              placeholder={`Enter description of ${entityName}`}
            />
          </FormField>
        )}
      />
      <Controller
        name={'imageUrl'}
        control={control}
        render={({ field }) => (
          <FormField>
            <LabelStyled>Image URL</LabelStyled>
            <InputStyled
              {...field}
              placeholder={`Enter image url of ${entityName}`}
            />
          </FormField>
        )}
      />
      <Controller
        name={'tags'}
        control={control}
        render={({ field }) => (
          <FormField>
            <LabelStyled>Tags</LabelStyled>
            <InputStyled
              {...field}
              placeholder={`Use coma to provide few tags`}
            />
          </FormField>
        )}
      />
      <Grid.Row>
        <ButtonStyled
          onClick={async () => {
            await createEntity(getValues());
            onConfirm();
            reset();
          }}>
          {t('button.confirm')}
        </ButtonStyled>
        <ButtonStyled
          onClick={async () => {
            onConfirm();
            reset();
          }}>
          {t('button.cancel')}
        </ButtonStyled>
      </Grid.Row>
    </CreateEntityFormStyled>
  );
};