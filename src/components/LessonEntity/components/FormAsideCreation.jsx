import { Controller, useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, FormField, Grid } from 'semantic-ui-react';
import { SinglePhotoInStorage } from '../../Dropzone/SinglePhotoInStorage';
import Editor from '../../TextEditor';
import { useEditEntity } from '../../../api/entity/useEditEntity';
import { useCreateEntity } from '../../../api/entity/useCreateEntity';
import { CreateEntityFormStyled } from '../../CreateEntityForm/CreateEntityFormStyled';
import { InputStyled, LabelStyled } from '../../InputStyled';
import { KsuTags } from '../../KsuTags/KsuTags';
import { ButtonStyled } from '../../ButtonStyled';
import { StyledDropdown } from '../../KsuDropdown/StyledDropdown';

export const FormAsideCreation = ({
  entityName,
  onConfirm,
  onClose,
  lessonsOptions,
  defaultValues = {},
}) => {
  const { reset, control, getValues } = useForm({
    defaultValues,
    caches: false,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { editEntity } = useEditEntity(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');

  return (
    <CreateEntityFormStyled className={'aside'}>
      <div className="aside-form">
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FormField name="image">
              <LabelStyled>{'Обкладинка'}</LabelStyled>
              <StyledDropdown className="lessons-dropdown">
                <Dropdown
                  placeholder="Виберіть один з уроків"
                  fluid
                  search
                  selection
                  value={field?.lessons?.[0]}
                  onChange={field.onChange}
                  options={lessonsOptions}
                />
              </StyledDropdown>
            </FormField>
          )}
        />
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <FormField name="image">
              <LabelStyled>{'Обкладинка'}</LabelStyled>
              <SinglePhotoInStorage
                onChange={field.onChange}
                file={field.value}
                folder={entityName}
              />
            </FormField>
          )}
        />
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormField name="title">
              <LabelStyled>{t(`${entityName}.labels.title`)}</LabelStyled>
              <InputStyled
                value={field.value}
                {...field}
                onChange={field.onChange}
                placeholder={t(`${entityName}.placeholders.title`)}
              />
            </FormField>
          )}
        />
        <Controller
          name="imageUrl"
          control={control}
          render={({ field }) => (
            <FormField name="imageUrl">
              <LabelStyled>{'Посилання на зображення'}</LabelStyled>
              <InputStyled
                value={field.value}
                {...field}
                onChange={field.onChange}
                placeholder={t(`${entityName}.placeholders.imageUrl`)}
              />
            </FormField>
          )}
        />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <FormField name="tags">
              <LabelStyled>{t(`${entityName}.labels.tags`)}</LabelStyled>
              <KsuTags
                field={field}
                value={field.value}
                placeholder={t(`${entityName}.placeholders.tags`)}
                onChange={field.onChange}
              />
            </FormField>
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <FormField name="text">
              <LabelStyled>{t(`${entityName}.labels.text`)}</LabelStyled>
              <Editor
                placeholder={'Почніть вводити текст...'}
                onChange={field.onChange}
                value={field.value}
              />
            </FormField>
          )}
        />
      </div>
      <Grid.Row>
        <ButtonStyled
          onClick={async () => {
            const newData = getValues();
            const id = defaultValues.id
              ? await editEntity(newData)
              : await createEntity(newData);
            await onConfirm(id, newData);
            onClose && onClose();
            reset();
          }}>
          {t('button.confirm')}
        </ButtonStyled>
        <ButtonStyled
            className="secondary"
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
