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

export const CreateEntityForm = ({ entityName, onConfirm, onClose, fields, defaultValues = {} }) => {
  // const dateString = defaultValues.birthday;
  // const [day, month, year] = dateString.split('.');
  // const dateObject = `${year}-${month}-${day}`;
  // console.log(dateObject);
  // defaultValues.birthday = dateObject;
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
  }, [defaultValues]);

  const { editEntity } = useEditEntity(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { t } = useTranslation('tr');

  const getElement = useCallback((el, field) => {
    switch (el.name) {
    case 'avatar':
      return (
        <div className="d-flex">
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
                {t(`students.placeholders.${el.name}`)}
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
    case 'birthday':
      return (
        <KsuDatePicker
          selected={field.value}
          placeholder={t(`students.placeholders.${el.name}`)}
          onChange={(date) => setValue('birthday', date)}
        />
      );
    default:
      return (
        <InputStyled
          value={field.value}
          {...field}
          placeholder={t(`students.placeholders.${el.name}`)}
        />
      );
    }
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
                  <LabelStyled>{t(`students.labels.${el.name}`)}</LabelStyled>
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
            const id = defaultValues.id
              ? await editEntity(getValues())
              : await createEntity(getValues());
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
