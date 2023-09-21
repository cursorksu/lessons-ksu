import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  ButtonIconStyled,
  ButtonStyled
} from '../ButtonStyled';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { DialogStyled } from '../DialogStyled';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useUpdateLesson } from '../../api/lesson';
import { HandleBar } from './components/HandleBar';
import { useCreateTopic, useUpdateTopic } from '../../api/topic';
import { Transition } from '../Transition';
import { List } from './components/List';
import { DateItem } from './components/DateItem';
import { TitleItem } from './components/TitleItem';
import { ParagraphItem } from './components/ParagraphItem';
import { DividerItem } from './components/DividerItem';
import { ImageItem } from './components/ImageItem';
import { LinkItem } from './components/LinkItem';
import { MediaItem } from './components/MediaItem';
import { useDispatch, useSelector } from 'react-redux';
import { setTopic as updateTopicInStore } from '../../store/dataReducer';
import { generateId } from '../../utils/generateId';

export const EditTextModal = ({ topicId }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { updateLesson } = useUpdateLesson();
  const { createTopic } = useCreateTopic();
  const { updateTopic } = useUpdateTopic();
  const { topic } = useSelector((state) => state.lessonData);
  const [updatedTopic, setUpdatedTopic] = useState(topic);
  useEffect(() => {
    topic && setUpdatedTopic(topic);
  }, [topic]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const reset = () => {
    setUpdatedTopic([]);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, []);

  const onSubmitHandler = useCallback(async () => {
    const list = updatedTopic?.filter((el) => el.value || el.type === 'dev');
    const updatedList = list
      .map((item) => item.type === 'list'
        ? ({
          ...item,
          value: item.value.filter((listItem) => listItem.value)
        })
        : item
      );

    try {
      if (!topicId) {
        const newTopicId = await createTopic(updatedList);
        await updateLesson(id, { topic: newTopicId });
        return;
      }

      await updateTopic(topicId, updatedList);
      dispatch(updateTopicInStore(updatedList));
    } finally {
      handleClose();
    }
  }, [
    dispatch,
    updatedTopic,
    createTopic,
    updateLesson,
    handleClose,
    id,
    topicId,
    updateTopic
  ]);

  const addEntity = useCallback((entityName) => {
    setUpdatedTopic((prev) => [...prev, {
      id: generateId(), value: '', type: entityName,
    },
    ]);
  }, []);

  const handleChangeField = (target, type) => {
    const { id, value, name } = target;
    const updatedData = { id, value, type: name || type};

    setUpdatedTopic((prev) => prev.map((el) => (el.id === id
      ? updatedData
      : el)));
  };

  const handleChangeParagraph = ({ target , ...e}) => {
    setUpdatedTopic((prev) => {
      let value = prev.find((el) => el.id === target.id)?.value;
      const updatedData = {
        id: target.id, value: target.value, type: 'paragraph',
      };
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        updatedData.value = value + '\n';
      }

      return prev.map((el) => (el.id === target.id
        ? updatedData
        : el));
    });
  };

  const handleRemove = useCallback((id) => {
    setUpdatedTopic((prev) => prev?.filter((el) => el.id !== id));
  }, []);

  const handleChange = useCallback((data) => {
    setUpdatedTopic((prev) => prev.map((el) => (el.id === data.id
      ? data
      : el)));
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // Создаем копию массива prevCards
    const updatedCards = [...updatedTopic];
    // Удаляем элемент, который нужно переместить
    const [draggedCard] = updatedCards.splice(result.source.index, 1);
    // Вставляем элемент в новую позицию
    updatedCards.splice(result.destination.index, 0, draggedCard);

    return setUpdatedTopic(updatedCards); // Обновляем стейт
  }


  return (<Box className='action'>
    <ButtonIconStyled onClick={handleOpen} className='print-hide'>
      <EditIcon />
    </ButtonIconStyled>
    <DialogStyled
      custommaxwidth={1000}
      open={isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <form>
        <DialogTitle className='title'>
              Створіть свою історію
          <HandleBar addEntity={addEntity} clearRenderList={reset} />
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </DialogTitle>
        <DialogContent className='dynamic-list'>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="dnd-edit-text-list">
              {(provided) => (
                <ul className="dnd-list" {...provided.droppableProps} ref={provided.innerRef}>
                  {updatedTopic?.map((el, index) => {
                    if ( el.type === 'list') {
                      return (
                        <List
                          key={el.id}
                          field={el}
                          index={index}
                          handleChange={handleChange}
                          handleRemove={handleRemove}
                        />
                      );
                    }

                    if (el.type === 'date') {
                      return <DateItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={handleChange}
                      />;
                    }

                    if (el.type === 'title') {
                      return <TitleItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={handleChangeField}
                        placeholder={'Введіть заголовок'}
                        label={'Заголовок'}
                      />;
                    }

                    if (el.type === 'subtitle') {
                      return <TitleItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={handleChangeField}
                        placeholder={'Введіть підзаголовок'}
                        label={'Підзаголовок'}
                      />;
                    }

                    if (el.type === 'paragraph') {
                      return <ParagraphItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={handleChangeParagraph}
                        placeholder={'Введіть параграф тексту'}
                        label={'Текст'}
                      />;
                    }

                    if (el.type === 'dev') {
                      return <DividerItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                      />;
                    }

                    if (el.type === 'image') {
                      return <ImageItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={(data) => handleChange({
                          id: el.id,
                          type: el.type,
                          ...data,
                        })}
                      />;
                    }

                    if (el.type === 'link') {
                      return <LinkItem
                        key={el.id}
                        field={el}
                        index={index}
                        label={{
                          value: "Посилання",
                          text: "Текст посилання",
                        }}
                        placeholder={{
                          value: "Додайте посилання",
                          text: "Додайте текст посилання",
                        }}
                        handleRemove={handleRemove}
                        handleChange={(data) => handleChange({
                          id: el.id,
                          type: el.type,
                          ...data,
                        })}
                      />;
                    }

                    if (el.type === 'media') {
                      return <MediaItem
                        key={el.id}
                        field={el}
                        index={index}
                        handleRemove={handleRemove}
                        handleChange={(data) => handleChange({
                          id: el.id,
                          type: el.type,
                          ...data,
                        })}
                      />;
                    }

                    if (el.type === 'dict') {
                      return <LinkItem
                        key={el.id}
                        field={el}
                        index={index}
                        label={{
                          value: "Слово",
                          text: "Визначення",
                        }}
                        placeholder={{
                          value: "Додайте слово",
                          text: "Додайте визначення",
                        }}
                        handleRemove={handleRemove}
                        handleChange={(data) => handleChange({
                          id: el.id,
                          type: el.type,
                          ...data,
                        })}
                      />;
                    }

                    return  <></>;
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </DialogContent>
        <DialogActions style={{ padding: '0 25px 25px' }}>
          <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={onSubmitHandler}>Зберегти</ButtonStyled>
        </DialogActions>
      </form>
    </DialogStyled>
  </Box>);
};
