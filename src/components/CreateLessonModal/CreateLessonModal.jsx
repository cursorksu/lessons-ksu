import React, { useCallback, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { DialogStyled } from '../DialogStyled';
import { Controller, useForm } from 'react-hook-form';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { InputStyled, TextareaAutosizeStyled } from '../InputStyled';
import { PRIMARY_MAIN } from '../../constants/colors';
import { Modal, ModalActions, ModalContent, ModalHeader, FormField } from 'semantic-ui-react';

const INITIAL_LESSON = {
  title: '',
  img: '',
  goal: '',
  bible: '',
  quote: '',
};

export const CreateLessonModal = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { handleSubmit, reset, control, formState } = useForm({
    defaultValues: INITIAL_LESSON,
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [reset]);

  const onSubmitHandler = useCallback(
    async (data) => {
      await onSubmit(data);
      setIsOpen(false);
      reset();
    },
    [onSubmit, setIsOpen, reset]
  );

  return (
    <DialogStyled>
      <Modal
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={
          <ButtonStyled variant="outlined" onClick={handleOpen}>
              + Добавить урок
          </ButtonStyled>
        }
        custommaxwidth={1000}
        open={isOpen}
        aria-describedby='alert-dialog-slide-description'
      >
        <ModalHeader className='title'>
            Название урока {}
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </ModalHeader>
        <ModalContent image className='dynamic-list'>
          <form>
            <div>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <FormField>
                    <label htmlFor="title" color="secondary">
                        Название урока
                    </label>
                    <InputStyled
                      id="title"
                      name="title"
                      placeholder="Название урока"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['title'] && (
                      <label sx={{ color: PRIMARY_MAIN }}>
                          Поле не должно быть пустым
                      </label>
                    )}
                  </FormField>
                )}
              />
            </div>
            <div>
              <Controller
                name="img"
                control={control}
                render={({ field }) => (
                  <FormField>
                    <label htmlFor="img" color="secondary">
                        Изображение
                    </label>
                    <InputStyled
                      id="img"
                      name="img"
                      placeholder="Вставьте ссылку на изображение"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['img'] && (
                      <label sx={{ color: PRIMARY_MAIN }}>
                          Поле не должно быть пустым
                      </label>
                    )}
                  </FormField>
                )}
              />
            </div>
            <div>
              <Controller
                name="goal"
                control={control}
                render={({ field }) => (
                  <FormField>
                    <label htmlFor="goal" color="secondary">
                        Название урока
                    </label>
                    <TextareaAutosizeStyled
                      rows={4}
                      id="goal"
                      name="goal"
                      placeholder="Основная мысль урока"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['goal'] && (
                      <label sx={{ color: PRIMARY_MAIN }}>
                          Поле не должно быть пустым
                      </label>
                    )}
                  </FormField>
                )}
              />
            </div>
            <div>
              <Controller
                name="bible"
                control={control}
                render={({ field }) => (
                  <FormField>
                    <label htmlFor="bible" color="secondary">
                        Место из бибилии
                    </label>
                    <TextareaAutosizeStyled
                      rows={4}
                      id="bible"
                      name="bible"
                      placeholder="Основное место из Библии"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['bible'] && (
                      <label sx={{ color: PRIMARY_MAIN }}>
                          Поле не должно быть пустым
                      </label>
                    )}
                  </FormField>
                )}
              />
            </div>
            <div>
              <Controller
                name="quote"
                control={control}
                render={({ field }) => (
                  <FormField>
                    <label htmlFor="quote" color="secondary">
                        Ссылка
                    </label>
                    <InputStyled
                      id="quote"
                      name="quote"
                      placeholder="В каком стихе это написано"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    {formState.errors['quote'] && (
                      <label sx={{ color: PRIMARY_MAIN }}>
                          Поле не должно быть пустым
                      </label>
                    )}
                  </FormField>
                )}
              />
            </div>
          </form>
        </ModalContent>
        <ModalActions>
          <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
              Зберегти
          </ButtonStyled>
        </ModalActions>
      </Modal>
    </DialogStyled>
  );
};
