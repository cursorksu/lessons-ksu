import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { DialogStyled } from '../DialogStyled';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
} from '@mui/material';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { useUpdateLesson } from '../../api/lesson';
import { BlockWrapperStyled } from './style';
import {
  InputFieldStyled,
  InputStyled,
  TextareaAutosizeStyled,
} from '../InputStyled';
import { HandleBar } from './components/HandleBar';
import { LessonsDatePicker } from '../DatePicker/DatePicker';
import { getRandomNumber } from '../../utils/randomizer';
import {
  useCreateTopic,
  useGetTopicById,
  useUpdateTopic,
} from '../../api/topic';
import { DropzoneField } from '../Dropzone/DropzoneField';
import { Link } from './components/Link';
import { Transition } from '../Transition';
import { DynamicList } from '../DynamicList/DynamicList';
import { DynamicListItem } from '../DynamicListItem/DynamicListItem';

export const EditTextModal = ({ topicId }) => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { updateLesson } = useUpdateLesson();
  const { getTopicById } = useGetTopicById();
  const { createTopic } = useCreateTopic();
  const { updateTopic } = useUpdateTopic();
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    isOpen &&
      getTopicById(topicId).then((data) => {
        data && setTopic(JSON.parse(data.topic));
      });
  }, [getTopicById, topicId, isOpen]);

  const [topic, setTopic] = useState([]);

  const reset = () => {
    setTopic([]);
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    reset();
  }, []);

  const onSubmitHandler = useCallback(async () => {
    try {
      if (!topicId) {
        const newTopicId = await createTopic(topic);
        await updateLesson(id, { topic: newTopicId });
        return;
      }
      console.log({ topicId });
      await updateTopic(topicId, topic);
      return;
    } catch (e) {
      console.log(e);
    } finally {
      handleClose();
    }
  }, [topic, createTopic, updateLesson, handleClose, id, topicId, updateTopic]);

  const addEntity = useCallback((entityName) => {
    setTopic((prev) => [
      ...prev,
      {
        id: getRandomNumber(0, 10000),
        value: '',
        type: entityName,
      },
    ]);
  }, []);

  const handleChangeField = (target, type) => {
    const updatedData = {
      id: +target.id,
      value: target.value,
      type: target.name || type,
    };

    setTopic((prev) =>
      prev.map((el) => (el.id === +target.id ? updatedData : el))
    );
  };

  const handleChangeParagraph = (e) => {
    setTopic((prev) => {
      let value = prev.find((el) => el.id === +e.target.id).value;
      const updatedData = {
        id: +e.target.id,
        value: e.target.value,
        type: 'paragraph',
      };
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        updatedData.value = value + '\n';
      }

      console.log({ value: updatedData.value });

      return prev.map((el) => (el.id === +e.target.id ? updatedData : el));
    });
  };

  const handleRemove = useCallback((id) => {
    setTopic((prev) => prev?.filter((el) => el.id !== id));
  }, []);

  const handleChange = useCallback((data) => {
    setTopic((prev) => prev.map((el) => (el.id === +data.id ? data : el)));
  }, []);

  const moveItem = (dragIndex, hoverIndex) => {
    setTopic((prevItem) => {
      const updatedCards = [...prevItem]; // Создаем копию массива prevCards
      const [draggedCard] = updatedCards.splice(dragIndex, 1); // Удаляем
      // элемент,
      // который нужно
      // переместить
      updatedCards.splice(hoverIndex, 0, draggedCard); // Вставляем элемент в
      // новую позицию
      return updatedCards; // Обновляем стейт
    });
  };

  return (
    <Box className="action">
      <ButtonIconStyled onClick={handleOpen} className="print-hide">
        <EditIcon />
      </ButtonIconStyled>
      <DialogStyled
        custommaxwidth={1000}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <form>
          <DialogTitle className="title">
            Створіть свою історію
            <HandleBar addEntity={addEntity} clearRenderList={reset} />
            <ButtonIconStyled onClick={handleClose}>
              <CloseIcon />
            </ButtonIconStyled>
          </DialogTitle>
          <DialogContent className="dynamic-list">
            <Box>
              {topic.length > 0 ? (
                topic?.map((el, idx) => (
                  <div>
                    {el.type === 'list' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <DynamicList
                            id={el.id}
                            field={{
                              id: el.id,
                              value: el.value,
                              onChange: (data) =>
                                handleChange({
                                  id: el.id || getRandomNumber(0, 10000),
                                  value: data,
                                  type: 'list',
                                }),
                            }}
                          />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}

                    {el.type === 'date' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <LessonsDatePicker
                            id={el.id}
                            legend={'Дата'}
                            value={el.value}
                            onChange={(data) =>
                              handleChange({
                                id: el.id,
                                value: data,
                                type: el.type,
                              })
                            }
                          />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'title' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <label htmlFor={el.id}>Заголовок</label>
                            <InputStyled
                              fluid
                              key={el.id}
                              id={el.id}
                              name={el.type}
                              placeholder="Введіть заголовок"
                              value={el.value}
                              onChange={(e) =>
                                handleChangeField(e.currentTarget)
                              }
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'subtitle' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <label htmlFor={el.id}>Підзаголовок</label>
                            <InputStyled
                              fluid
                              key={el.id}
                              id={el.id}
                              name={el.type}
                              placeholder="Введіть заголовок другого рівня"
                              value={el.value}
                              onChange={(e) =>
                                handleChangeField(e.currentTarget)
                              }
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'paragraph' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <FormLabel className="label">Параграф</FormLabel>
                            <TextareaAutosizeStyled
                              rows={4}
                              id={el.id}
                              name="paragraph"
                              placeholder="Введіть параграф тектсу"
                              value={el.value}
                              onChange={(e) => handleChangeParagraph(e)}
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'code' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <FormLabel className="label">
                              Додайте html
                            </FormLabel>
                            <TextareaAutosizeStyled
                              rows={4}
                              id={el.id}
                              name="code"
                              placeholder="Введіть html"
                              value={el.value}
                              onChange={(e) => handleChangeField(e.target)}
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'dev' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled className="hr">
                          <label htmlFor={el.id}>Розділювач</label>
                          <hr id={el.id} />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'link' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <Link
                            onChange={(data) =>
                              handleChange({
                                id: el.id || getRandomNumber(0, 10000),
                                type: 'link',
                                ...data,
                              })
                            }
                          />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                    {el.type === 'dict' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <Link
                            onChange={(data) =>
                              handleChange({
                                id: el.id || getRandomNumber(0, 10000),
                                type: 'dict',
                                ...data,
                              })
                            }
                          />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}

                    {el.type === 'media' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <label htmlFor={el.id}>
                              Ми не можемо зберігати повні відео у нашій базі
                              даних, яка фінансується на кошти волотнерів і
                              власні кошти розробніків
                            </label>
                            <br />
                            <label htmlFor={el.id}>
                              Але ви можете розмістити своє відео в YouTube і
                              додати посилання на нього тут
                            </label>
                            <InputStyled
                              fluid
                              key={el.id}
                              id={el.id}
                              name={el.type}
                              placeholder="Додайте посилання на відео"
                              value={el.value}
                              onChange={(e) =>
                                handleChangeField(e.currentTarget)
                              }
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}

                    {el.type === 'image' && (
                      <DynamicListItem
                        key={el.id}
                        field={el}
                        index={idx}
                        handleRemove={handleRemove}
                        moveItem={moveItem}
                      >
                        <BlockWrapperStyled>
                          <DropzoneField
                            onChange={(data) =>
                              handleChange({
                                id: el.id || getRandomNumber(0, 10000),
                                type: el.type,
                                ...data,
                              })
                            }
                          />
                        </BlockWrapperStyled>
                      </DynamicListItem>
                    )}
                  </div>
                ))
              ) : (
                <></>
              )}
            </Box>
          </DialogContent>
          <DialogActions style={{ padding: '0 25px 25px' }}>
            <ButtonStyled onClick={handleClose}>Відмінити</ButtonStyled>
            <ButtonStyled onClick={onSubmitHandler}>Зберегти</ButtonStyled>
          </DialogActions>
        </form>
      </DialogStyled>
    </Box>
  );
};
