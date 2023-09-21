import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router';
import { Popup } from 'semantic-ui-react';
import { Controller, useForm } from 'react-hook-form';
import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { DialogStyled } from '../DialogStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { useGetLessonById, useUpdateLesson } from '../../api/lesson';
import { Bible } from './components/Bible';
import { Topic } from './components/Topic';
import { EditModalStyled } from './style';
import { Transition } from '../Transition';
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
  const { getLessonById } = useGetLessonById();

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
    [setIsOpen, id, getLessonById, updateLesson, reset]
  );

  return (
    <EditModalStyled>
      <Popup
        trigger={(
          <ButtonIconStyled onClick={handleOpen} className="print-hide">
            <EditIcon />
          </ButtonIconStyled>
        )}
        content='Змінити назву уроку'
      />
      <DialogStyled
        custommaxwidth={600}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form>
          <DialogTitle className="title">
            {getTitle(fieldName)}
            <ButtonIconStyled onClick={handleClose}>
              <CloseIcon />
            </ButtonIconStyled>
          </DialogTitle>
          <DialogContent>
            <Box>
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
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '0 25px 25px' }}>
            <ButtonStyled onClick={handleClose}>Отменить</ButtonStyled>
            <ButtonStyled onClick={handleSubmit(onSubmitHandler)}>
              Сохранить
            </ButtonStyled>
          </DialogActions>
        </form>
      </DialogStyled>
    </EditModalStyled>
  );
};
