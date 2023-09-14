import React, { useCallback, useState } from 'react';
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
import { BlockWrapperStyled, EditModalStyled } from './style';
import {
  InputFieldStyled,
  InputStyled,
  TextareaAutosizeStyled,
} from '../InputStyled';
import { HandleBar } from './components/HandleBar';
import { LessonsDatePicker } from '../DatePicker/DatePicker';
import { getRandomNumber } from '../../utils/randomizer';
import { useCreateTopic } from '../../api/topic';
import { DropzoneField } from '../Dropzone/DropzoneField';
import { Link } from './components/Link';
import { Transition } from '../Transition';
import { DynamicList } from '../DynamicList/DynamicList';

export const EditTextModal = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { updateLesson } = useUpdateLesson();
  const { createTopic } = useCreateTopic();
  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

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
      const topicId = await createTopic(topic);
      await updateLesson(id, { topic: topicId });
      handleClose();
    } catch (e) {
      console.log(e);
    }
  }, [topic, createTopic, updateLesson, handleClose, id]);

  const addEntity = useCallback(
    (entityName) => {
      setTopic((prev) => [
        ...prev,
        {
          id: getRandomNumber(0, 10000),
          value: '',
          type: entityName,
        },
      ]);
    },
    [setTopic],
  );

  const handleChangeField = (target, type) => {
    const updatedData = {
      id: +target.id,
      value: target.value,
      type: target.name || type,
    };

    setTopic((prev) =>
      prev.map((el) => (el.id === +target.id ? updatedData : el)),
    );
  };

  const handleChange = (data) => {
    setTopic((prev) => prev.map((el) => (el.id === +data.id ? data : el)));
  };

  return (
    <Box className="action">
      <EditModalStyled>
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
            <DialogContent>
              <Box>
                {topic.length > 0 ? (
                  topic?.map((el) => (
                    <div>
                      {el.type === 'list' && (
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
                      )}

                      {el.type === 'date' && (
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
                      )}
                      {el.type === 'title' && (
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <label htmlFor={el.id}>Заголовок</label>
                            <InputStyled
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
                      )}
                      {el.type === 'subtitle' && (
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <label htmlFor={el.id}>Підзаголовок</label>
                            <InputStyled
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
                      )}
                      {el.type === 'paragraph' && (
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <FormLabel className="label">Параграф</FormLabel>
                            <TextareaAutosizeStyled
                              id={el.id}
                              name="paragraph"
                              placeholder="Введіть параграф тектсу"
                              value={el.value}
                              onChange={(e) => handleChangeField(e.target)}
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      )}
                      {el.type === 'code' && (
                        <BlockWrapperStyled>
                          <InputFieldStyled>
                            <FormLabel className="label">
                              Додайте html
                            </FormLabel>
                            <TextareaAutosizeStyled
                              id={el.id}
                              name="code"
                              placeholder="Введіть html"
                              value={el.value}
                              onChange={(e) => handleChangeField(e.target)}
                            />
                          </InputFieldStyled>
                        </BlockWrapperStyled>
                      )}
                      {el.type === 'dev' && (
                        <BlockWrapperStyled>
                          <hr id={el.id} />
                        </BlockWrapperStyled>
                      )}
                      {el.type === 'link' && (
                        <Link
                          onChange={(data) =>
                            handleChange({
                              id: el.id || getRandomNumber(0, 10000),
                              type: 'link',
                              ...data,
                            })
                          }
                        />
                      )}
                      {el.type === 'dict' && (
                        <Link
                          onChange={(data) =>
                            handleChange({
                              id: el.id || getRandomNumber(0, 10000),
                              type: 'dict',
                              ...data,
                            })
                          }
                        />
                      )}

                      {el.type === 'media' && (
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
                      )}

                      {el.type === 'image' && (
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
      </EditModalStyled>
    </Box>
  );
};
