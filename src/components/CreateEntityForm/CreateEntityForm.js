import { CreateEntityFormStyled } from './CreateEntityFormStyled';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyled } from '../ButtonStyled';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Grid } from 'semantic-ui-react';
import { InputStyled, LabelStyled } from '../InputStyled';

export const CreateEntityForm = ({ entityName, onConfirm, onClose, fields, defaultValues = {} }) => {
  const { reset, control, getValues } = useForm({
    defaultValues,
  });
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');
  return (
    <CreateEntityFormStyled>
      <div className="content-grid">
        {fields.map(el => {
          return (
            <Controller
              name={el.name}
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled>{el.label}</LabelStyled>
                  <InputStyled
                    value={field.value}
                    {...field}
                    placeholder={el.placeholder}
                  />
                </FormField>
              )}
            />
          );
        })}
      </div>
      <Grid.Row>
        <ButtonStyled
          onClick={async () => {
            const id = await createEntity(getValues());
            await onConfirm(id, getValues());
            onClose && onClose();
            reset();
          }}>
          {t('button.confirm')}
        </ButtonStyled>
        <ButtonStyled
          onClick={async () => {
            onClose && onClose();
            reset();
          }}>
          {t('button.cancel')}
        </ButtonStyled>
      </Grid.Row>
    </CreateEntityFormStyled>
  );
};