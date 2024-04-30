import React, { useCallback, useEffect, useState } from 'react';
import {
  ButtonIconStyled, ButtonStyled
} from '../ButtonStyled';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { HandleBar } from './components/HandleBar';
import { List } from './components/List';
import { DateItem } from './components/DateItem';
import { TitleItem } from './components/TitleItem';
import { ParagraphItem } from './components/ParagraphItem';
import { DividerItem } from './components/DividerItem';
import { ImageItem } from './components/ImageItem';
import { LinkItem } from './components/LinkItem';
import { MediaItem } from './components/MediaItem';
import { generateId } from '../../utils/generateId';
import { Modal, ModalActions, ModalContent, ModalHeader } from 'semantic-ui-react';
import { DialogStyled } from '../DialogStyled';

const getTitle = (name) => {
  switch (name) {
  case 'craft':
    return 'Додайте нову творчу активність';
  case 'game':
    return 'Додайте нову гру';
  default :
    return 'Створіть свою історію';
  }
};

export const EditTextModal = ({ entityId, entityName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updatedEntity, setUpdatedEntity] = useState(null);

  useEffect(() => {

  }, [
    isOpen,
    entityName,
  ]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  const reset = () => {
    setUpdatedEntity([]);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, []);

  const onSubmitHandler = useCallback(
    async () => {
      try {
      } finally {
        handleClose();
      }
    },
    [
      handleClose,
    ]
  );

  const addEntity = useCallback((entityName) => {
    setUpdatedEntity((prev) => Array.isArray(prev)
      ? [...prev, {
        id: generateId(), value: '', type: entityName,
      },
      ]
      : []);
  }, []);

  const handleChangeField = (target, type) => {
    const { id, value, name } = target;
    const updatedData = { id, value, type: name || type };

    setUpdatedEntity((prev) => prev.map((el) => (el?.id === id
      ? updatedData
      : el)));
  };

  const handleChangeParagraph = ({ target, ...e }) => {
    setUpdatedEntity((prev) => {
      let value = prev?.find((el) => el?.id === target.id)?.value;
      const updatedData = {
        id: target?.id, value: target.value, type: 'paragraph',
      };
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        updatedData.value = value + '\n';
      }

      return prev.map((el) => (el?.id === target.id
        ? updatedData
        : el));
    });
  };

  const handleRemove = useCallback((id) => {
    setUpdatedEntity((prev) => prev?.filter((el) => el?.id !== id));
  }, []);

  const handleChange = useCallback((data) => {
    setUpdatedEntity((prev) => prev.map((el) => (el?.id === data.id
      ? data
      : el)));
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    // Создаем копию массива prevCards
    const updatedCards = [...updatedEntity];
    // Удаляем элемент, который нужно переместить
    const [draggedCard] = updatedCards.splice(result.source.index, 1);
    // Вставляем элемент в новую позицию
    updatedCards.splice(result.destination.index, 0, draggedCard);

    return setUpdatedEntity(updatedCards); // Обновляем стейт
  }

  return (
    <DialogStyled>
      <Modal
        onClose={handleClose}
        onOpen={handleOpen}
        trigger={
          <ButtonIconStyled className='print-hide'>
            <EditIcon />
          </ButtonIconStyled>
        }
        open={isOpen}
      >
        <ModalHeader className='title'>
          {getTitle(entityName)}
          <HandleBar
            addEntity={addEntity}
            clearRenderList={reset}
            mode={entityName}
          />
          <ButtonIconStyled onClick={handleClose}>
            <CloseIcon />
          </ButtonIconStyled>
        </ModalHeader>
        <ModalContent image className='dynamic-list'>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='dnd-edit-text-list'>
              {(provided) => (<ul
                className='dnd-list' {...provided.droppableProps}
                ref={provided.innerRef}>
                {updatedEntity?.map((el, index) => {
                  if (el.type === 'list') {
                    return (<List
                      key={el?.id}
                      field={el}
                      index={index}
                      handleChange={handleChange}
                      handleRemove={handleRemove}
                    />);
                  }

                  if (el.type === 'date') {
                    return <DateItem
                      key={el?.id}
                      field={el}
                      index={index}
                      handleRemove={handleRemove}
                      handleChange={handleChange}
                    />;
                  }

                  if (el.type === 'title') {
                    return <TitleItem
                      key={el?.id}
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
                      key={el?.id}
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
                      key={el?.id}
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
                      key={el?.id}
                      field={el}
                      index={index}
                      handleRemove={handleRemove}
                    />;
                  }

                  if (el.type === 'image') {
                    return <ImageItem
                      key={el?.id}
                      field={el}
                      index={index}
                      handleRemove={handleRemove}
                      handleChange={(data) => handleChange({
                        id: el?.id, type: el.type, ...data,
                      })}
                    />;
                  }

                  if (el.type === 'link') {
                    return <LinkItem
                      key={el?.id}
                      field={el}
                      index={index}
                      label={{
                        value: 'Посилання', text: 'Текст посилання',
                      }}
                      placeholder={{
                        value: 'Додайте посилання',
                        text: 'Додайте текст посилання',
                      }}
                      handleRemove={handleRemove}
                      handleChange={(data) => handleChange({
                        id: el?.id, type: el.type, ...data,
                      })}
                    />;
                  }

                  if (el.type === 'media') {
                    return <MediaItem
                      key={el?.id}
                      field={el}
                      index={index}
                      handleRemove={handleRemove}
                      handleChange={(data) => handleChange({
                        id: el?.id, type: el.type, ...data,
                      })}
                    />;
                  }

                  if (el.type === 'dict') {
                    return <LinkItem
                      key={el?.id}
                      field={el}
                      index={index}
                      label={{
                        value: 'Слово', text: 'Визначення',
                      }}
                      placeholder={{
                        value: 'Додайте слово', text: 'Додайте визначення',
                      }}
                      handleRemove={handleRemove}
                      handleChange={(data) => handleChange({
                        id: el?.id, type: el.type, ...data,
                      })}
                    />;
                  }

                  return <></>;
                })}
                {provided.placeholder}
              </ul>)}
            </Droppable>
          </DragDropContext>
        </ModalContent>
        <ModalActions>
          <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={onSubmitHandler}>Зберегти</ButtonStyled>
        </ModalActions>
      </Modal>
    </DialogStyled>
  );
};
