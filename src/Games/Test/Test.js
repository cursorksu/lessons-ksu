import React, { useEffect, useRef, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { TestItem } from './components/TestItem';
import { Popup } from 'semantic-ui-react';
import { ValidationErrorStyled } from '../../components/ValidationErrorStyled';
import { TestTextStyled, TestWrapperStyled } from './components/TestItemStyled';
import { clsx } from 'clsx';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
const { v4: uuidv4 } = require('uuid');

export const Test = ({ onSave, settings }) => {
  const timoutRef = useRef(null);
  const [testSaved, setTestSaved] = useState(false);
  const [test, setTest] = useState([
    {
      id: uuidv4(),
      question: '',
      error: {
        char: '',
        answersLength: '',
        questionLength: '',
        noFact: '',
      },
      answer: [
        {
          char: '',
          id: uuidv4(),
          text: '',
          isTrue: false,
        },
      ],
    },
  ]);

  useEffect(() => {
    const prevTest = localStorage.getItem('test');
    const prevTestParsed = prevTest && JSON.parse(prevTest);

    settings?.length
      ? setTest(settings)
      : prevTestParsed?.length && setTest(prevTestParsed);
  }, [settings]);

  useEffect(() => {
    timoutRef.current = setTimeout(() => {
      setTest((prev) =>
        prev.map((item) => ({
          ...item,
          error: {
            char: '',
            answersLength: '',
            questionLength: '',
            noFact: '',
          },
        }))
      );
    }, 12000);

    return () => {
      clearTimeout(timoutRef.current);
    };
  }, [test]);

  const addQuestion = () => {
    setTest((prev) => [
      {
        id: uuidv4(),
        question: '',
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          noFact: '',
        },
        answer: [
          {
            char: '',
            id: uuidv4(),
            text: '',
            isTrue: false,
          },
        ],
      },
      ...prev,
    ]);
  };

  const onRemoveItem = (id) => {
    setTest((prev) => prev.filter((el) => el.id !== id));
  };

  const handleChangeItem = (id, content) => {
    if (typeof content === 'string') {
      if (content?.length > 160) {
        setTest((prev) =>
          prev.map((item) => ({
            ...item,
            error: {
              ...item.error,
              questionLength:
                'Для цього типу гир довжина запитання не може' +
                ' перевищувати 160 символів',
            },
          }))
        );

        return;
      }
      setTest((prev) =>
        prev.map((el) => (el.id === id ? { ...el, question: content } : el))
      );
    } else {
      if (content?.length > 8) {
        setTest((prev) =>
          prev.map((el) =>
            el.id === id
              ? {
                ...el,
                error: {
                  ...el.error,
                  char:
                      'Для цього типу гри кількість відповідей не може' +
                      ' бути більше 8',
                },
              }
              : el
          )
        );

        return;
      }

      if (content?.some((el) => el.text?.length > 50)) {
        setTest((prev) =>
          prev.map((el) =>
            el.id === id
              ? {
                ...el,
                error: {
                  ...el.error,
                  answersLength:
                      'Для цього типу гри довжина відповіді не може' +
                      ' бути більше 50 символів',
                },
              }
              : el
          )
        );

        return;
      }

      setTest((prev) =>
        prev.map((el) => (el.id === id ? { ...el, answer: content } : el))
      );
    }
  };

  const handleSave = () => {
    const prevTest = localStorage.getItem('test');
    const prevTestParsed = settings
      ? settings
      : prevTest && JSON.parse(prevTest);

    const noFactItem = test?.find((item) =>
      item.answer.every((el) => !el.isTrue)
    );

    if (noFactItem?.id) {
      setTest((prev) =>
        prev.map((item) =>
          item.id === noFactItem.id
            ? {
              ...item,
              error: {
                ...item.error,
                noFact:
                    'Посуньте повзик щоб відмітити хочаб одну правильну' +
                    ' відповідь',
              },
            }
            : item
        )
      );

      return;
    }
    if (prevTestParsed?.length) {
      const newTest = new Set([...prevTestParsed, ...test]);
      onSave({
        id: 'test',
        settings: Array.from(newTest),
      });
      localStorage.setItem('test', JSON.stringify(Array.from(newTest)));
    }
    onSave({
      id: 'test',
      settings: Array.from(test),
    });
    localStorage.setItem('test', JSON.stringify(Array.from(test)));
    setTestSaved(true);
  };

  const handleCancel = () => {
    setTestSaved(false);
    setTest([
      {
        id: uuidv4(),
        question: '',
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          noFact: '',
        },
        answer: [
          {
            id: uuidv4(),
            text: '',
            isTrue: false,
            char: '',
          },
        ],
      },
    ]);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    setTest((prevCards) => {
      // Создаем копию массива prevCards
      const updatedCards = [...prevCards];
      // Удаляем элемент, который нужно переместить
      const [draggedCard] = updatedCards.splice(result.source.index, 1);
      // Вставляем элемент в новую позицию
      updatedCards.splice(result.destination.index, 0, draggedCard);
      return updatedCards; // Обновляем стейт
    });
  }

  return (
    <TestWrapperStyled>
      <aside className="aside-wrapper">
        <div>
          <h2 className="title d-flex">Створіть тест</h2>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="dnd-list">
              {(provided) => (
                <TestTextStyled
                  className="test dnd-list"
                  {...provided.droppableProps}
                  ref={provided.innerRef}>
                  {test?.some((el) => el.question?.length)
? (
                    test.map((testItem, idx) => (
                      <Draggable
                        key={idx.toString()}
                        draggableId={idx.toString()}
                        index={idx}>
                        {(provided) => (
                          <li
                            key={testItem.id}
                            className="test-item"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <div className="drag-handler" />
                            <span className="test-text-question">
                              <b>
                                {idx + 1}. {testItem.question}
                              </b>
                            </span>
                            <ul>
                              {testItem.answer.map((answer, index) => (
                                <li key={answer.id}>
                                  <b>{`${answer.char}${answer.char && ')'}`}</b>
                                  {answer.text}
                                </li>
                              ))}
                            </ul>
                          </li>
                        )}
                      </Draggable>
                    ))
                  )
: (
                    <div className="empty-test">
                      Тут з'являться питання тесту
                    </div>
                  )}
                </TestTextStyled>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <br />
      </aside>
      <section className="content-wrapper">
        <h2 className="title">Додайте тест</h2>
        <p>
          Відмідьте ті питання, які будуть скриті при виборі опції 50 на 50. Не
          відмічайте цією відміткою правильну відповідь. Тільки ви регулююте які
          відповіді будуть скриті під час вибору опції 50%50.
        </p>
        <div
          className={clsx({
            'sticky-action': true,
            error: test?.some((el) =>
              Object.keys(el.error)?.some((key) => el.error[key])
            ),
            success:
              testSaved &&
              test.every((el) =>
                Object.keys(el.error).every((key) => !el.error[key])
              ),
          })}>
          <Popup
            closeOnPortalMouseLeave
            openOnTriggerMouseEnter
            trigger={
              <ButtonIconStyled onClick={addQuestion}>+</ButtonIconStyled>
            }
            content={'Додати питання до тесту'}
          />
          {test?.length && (
            <>
              <ButtonStyled onClick={handleCancel}>Відмінити</ButtonStyled>
              <ButtonStyled onClick={handleSave}>Зберігти</ButtonStyled>
            </>
          )}
        </div>
        {test.map((el) => {
          return (
            <div className="question-wrapper ">
              {el.error.char && (
                <ValidationErrorStyled>{el.error.char}</ValidationErrorStyled>
              )}
              {el.error.answersLength && (
                <ValidationErrorStyled>
                  {el.error.answersLength}
                </ValidationErrorStyled>
              )}
              {el.error.noFact && (
                <ValidationErrorStyled>{el.error.noFact}</ValidationErrorStyled>
              )}
              {el.error.questionLength && (
                <ValidationErrorStyled>
                  {el.error.questionLength}
                </ValidationErrorStyled>
              )}
              <TestItem
                item={el}
                onRemoveItem={onRemoveItem}
                onChange={handleChangeItem}
              />
            </div>
          );
        })}
      </section>
    </TestWrapperStyled>
  );
};
