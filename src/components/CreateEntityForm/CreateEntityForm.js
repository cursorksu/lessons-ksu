import { CreateEntityFormStyled } from './CreateEntityFormStyled';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import { ButtonStyled } from '../ButtonStyled';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormField, Grid, Popup } from 'semantic-ui-react';
import { InputStyled, LabelStyled } from '../InputStyled';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { KsuDatePicker } from '../KsuDatePicker';
import { KsuDropzone } from '../Dropzone/KsuDropzone';
import { KsuDropdown } from '../KsuDropdown';

export const CreateEntityForm = ({ entityName, onConfirm, onClose, fields, defaultValues = {} }) => {
  const [emojiIsOpen, setEmojiIsOpen] = useState(false);
  const { reset, control, getValues, setValue } = useForm({
    defaultValues,
    caches: false });
  const emojiHandler = async (emj) => {
    await setValue('avatar', emj.unified);
    await setEmojiIsOpen(false);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const { editEntity } = useEditEntity(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');

  const getElement = useCallback((el, field) => {
    switch (el.inputType) {
    case 'emojiPicker':
      return (
        <div className="d-flex duo-cell">
          <div className="avatar">
            <Emoji size={80} unified={getValues('avatar')} />
          </div>
          <Popup
            closeOnPortalMouseLeave={false}
            openOnTriggerClick
            open={emojiIsOpen}
            trigger={(
              <ButtonStyled
                onClick={() => setEmojiIsOpen(prev => !prev)}
              >
                {t(`${entityName}.placeholders.${el.name}`)}
              </ButtonStyled>
            )}
            content={ <EmojiPicker
              width={'100%'}
              open={emojiIsOpen}
              onEmojiClick={emojiHandler}
            />}
          />
        </div>
      );
    case 'datePicker':
      return (
        <KsuDatePicker
          selected={field.value}
          placeholder={t(`${entityName}.placeholders.${el.name}`)}
          onChange={(date) => setValue(el.name, date)}
        />
      );
    case 'imagePicker':
      return (
        <div className="triple-cell">
          <KsuDropzone
            onChange={(data) => setValue(field.name, data)}
            files={getValues(field.name)}
            multiple={false}
          />
        </div>
      );
    case 'imagesPicker':
      return (
        <KsuDropzone
          onChange={(data) => setValue(field.name, data)}
          files={getValues(field.name)}
          multiple={true}
        />
      );
    case 'multiselectDropdown':
      return (
        <KsuDropdown
          entityName={el.entity}
          field={field}
          onChange={(data) => setValue(field.name, data)}
          multiple={true}
        />
      );
    default:
      return (
        <InputStyled
          value={field.value}
          {...field}
          placeholder={t(`${entityName}.placeholders.${field.name}`)}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emojiIsOpen]);

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
                  <LabelStyled>{t(`${entityName}.labels.${el.name}`)}</LabelStyled>
                  {getElement(el, field)}
                </FormField>
              )}
            />
          );
        })}
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
