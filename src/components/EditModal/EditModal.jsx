import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { Controller, useForm } from 'react-hook-form';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { useUpdateLesson } from '../../api/lesson';
import { Bible } from './components/Bible';
import { Topic } from './components/Topic';
import { EditModalStyled } from './style';
import { DynamicList } from '../DynamicList/DynamicList';

const FieldName = {
  bible: 'bible',
  list: 'list',
  topic: 'topic',
};
const getTitle = (fieldName) => {
  switch (fieldName) {
  case 'bible':
    return 'Додайте місце з Біблії';
  case 'list':
    return 'Додайте необхідні матеріали';
  case 'topic':
    return 'Додайте історію до уроку';
  default:
    return 'Дефолтна назва';
  }
};

export const EditModal = ({ fieldName, fieldData }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { updateLesson } = useUpdateLesson();
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      [fieldName]: fieldData,
    },
  });

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, [setIsOpen, reset]);

  const onSubmitHandler = useCallback(
    async (data) => {
      await updateLesson(id, data);
      setIsOpen(false);
      reset();
    },
    [setIsOpen, id, updateLesson, reset]
  );

  return (
    <EditModalStyled>
      <Modal
        keepMounted
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={
          <ButtonIconStyled onClick={handleOpen} className="print-hide">
            <EditIcon />
          </ButtonIconStyled>
        }
        open={isOpen}
      >
        <ModalHeader className='title'>
          {getTitle(fieldName)}
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </ModalHeader>
        <ModalContent image className='dynamic-list'>
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => {
              if (field.name === FieldName.bible) {
                return <Bible field={field} />;
              }
              if (field.name === FieldName.list) {
                return (
                  <DynamicList field={field} initialField={fieldData} />
                );
              }
              if (field.name === FieldName.topic) {
                return <Topic field={field} />;
              }

              return <></>;
            }}
          />
        </ModalContent>
        <ModalActions>
          <ButtonStyled onClick={handleClose}>Отменить</ButtonStyled>
          <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
            Сохранить
          </ButtonStyled>
        </ModalActions>
      </Modal>
    </EditModalStyled>
  );
};
