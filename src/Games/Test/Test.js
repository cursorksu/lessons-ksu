import { MainLayout } from '../../pages/MainLayout';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { TestItem } from './components/TestItem';
import { Popup } from 'semantic-ui-react';
import { ValidationErrorStyled } from '../../components/ValidationErrorStyled';
import { TestTextStyled } from './components/TestItemStyled';
import { useNavigate } from 'react-router';
import { MillionerLink } from './TestGameViewStyled';
const { v4: uuidv4 } = require('uuid');

export const Test = () => {
  const timoutRef = useRef(null);
  const navigation = useNavigate();

  const [testSaved, setTestSaved] = useState(false);
  const [test, setTest] = useState([ {
    id: uuidv4(),
    question: '',
    error: {
      char: '',
      answersLength: '',
      questionLength: '',
      notIsFact: '',
    },
    answer: [
      {
        char: '',
        id: uuidv4(),
        text: '',
        isTrue: false,
      },
    ],
  }
  ]);


  useEffect(() => {
    timoutRef.current = setTimeout(() => {
      setTest(prev => prev.map((item) => ({
        ...item,
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          notIsFact: '',
        },
      })));
    }, 6000);

    return () => {
      clearTimeout(timoutRef.current);
    };
  }, [test]);

  const addQuestion = () => {
    setTest(prev => [
      {
        id: uuidv4(),
        question: '',
        error: {
          char: '',
          answersLength: '',
          questionLength: '',
          notIsFact: '',
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
    setTest(prev => prev.filter(el => el.id !== id));
  };

  const handleChangeItem = (id, content) => {
    if (typeof content === 'string') {
      if (content?.length > 80) {
        setTest(prev => prev.map((item) => ({
          ...item,
          error: {
            ...item.error,
            questionLength: 'Для цього типу гир довжина запитання не може' +
              ' перевищувати 80 символів',
          },
        })));

        return;
      }
      setTest(prev => prev.map(el =>
        el.id === id
          ? {...el, question: content}
          : el
      ));
    } else {
      if (content?.length > 8) {
        setTest(prev => prev.map(el =>
          el.id === id
            ? {
              ...el,
              error: {
                ...el.error,
                char: 'Для цього типу гри кількість відповідей не може' +
                  ' бути більше 8',
              }
            }
            : el
        ));

        return;
      }

      if (content?.some(el => el.text?.length > 18)) {
        setTest(prev => prev.map(el =>
          el.id === id
            ? {
              ...el, error: {
                ...el.error,
                answersLength: 'Для цього типу гри довжина відповіді не може' +
                  ' бути більше 18 символів',
              }
            }
            : el
        ));

        return;
      }

      setTest(prev => prev.map(el =>
        el.id === id
          ? {...el, answer: content}
          : el
      ));
    }
  };

  const handleSave = () => {
    const notFactItem = test.find(item => item.answer.every((el) => !el.isTrue));

    if (notFactItem?.id) {
      setTest(prev => prev.map((item) => ({
        ...item,
        error: {
          ...item.error,
          notIsFact: 'Посуньте повзик щоб відмітити хочаб одну правильну' +
            ' відповідь',
        },
      })));

      return;
    }

    localStorage.setItem('test', JSON.stringify(test));
    setTestSaved(true);
  };

  const handleCancel = () => {
    setTest([ {
      id: uuidv4(),
      question: '',
      error: {
        char: '',
        answersLength: '',
        questionLength: '',
        notIsFact: '',
      },
      answer: [
        {
          id: uuidv4(),
          text: '',
          isTrue: false,
          char: '',
        },
      ],
    }
    ]);
  };

  return (
    <MainLayout>
      <div className="herro">
        <div className="title-wrapper">
          <h2 className="subtitle"> Kids Spiritual Universe</h2>
          <h1 className="title">Test</h1>
        </div>
      </div>

      <section className="ksu-content">
        <aside className="aside-wrapper">
          <div>
            <h2 className="title d-flex">
                Створіть тест

              <Popup
                closeOnPortalMouseLeave
                openOnTriggerMouseEnter
                trigger={(
                  <MillionerLink
                    disabled={!testSaved}
                    onClick={() => navigation('/games/test-game-view')}
                  />
                )}
                content={'Коли тест буде збережено ви зможете перейти в' +
                  ' ігровий простір і побачити результат'}
              />
            </h2>

            <TestTextStyled className="test">
              {test.map((testItem, idx) => (
                <li key={testItem.id} className="test-item">
                  <span className="test-text-question"><b>{idx + 1}.</b> {testItem.question}</span>
                  <ul>
                    {testItem.answer.map((answer, index) => (
                      <li key={answer.id}><b>{answer.char})</b>{answer.text}</li>
                    ))
                    }
                  </ul>
                </li>
              ))}
            </TestTextStyled>
          </div>
          <br/>
          <iframe
            title="gameDescription"
            width="100%"
            height="315"
            src={'https://youtu.be/hiHy3vW2SxI?t=5'}
            allowFullScreen={true} />
        </aside>
        <section className='content-wrapper'>
          <div className="d-flex">
            <h2 className='title'>Додайте тест</h2>
            <Popup
              closeOnPortalMouseLeave
              openOnTriggerMouseEnter
              trigger={(
                <ButtonIconStyled onClick={addQuestion}>+</ButtonIconStyled>
              )}
              content={'Додати питання до тесту'}
            />
          </div>
          {test.map(el => {
            return (
              <div className="question-wrapper ">
                {el.error.char && <ValidationErrorStyled>{el.error.char}</ValidationErrorStyled>}
                {el.error.answersLength && <ValidationErrorStyled>{el.error.answersLength}</ValidationErrorStyled>}
                {el.error.notIsFact && <ValidationErrorStyled>{el.error.notIsFact}</ValidationErrorStyled>}
                {el.error.questionLength && <ValidationErrorStyled>{el.error.questionLength}</ValidationErrorStyled>}
                <TestItem
                  item={el}
                  onRemoveItem={onRemoveItem}
                  onChange={handleChangeItem}
                />
              </div>
            );
          })}
          <ButtonStyled onClick={handleCancel}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={handleSave}>Зберігти</ButtonStyled>
        </section>
      </section>
    </MainLayout>
  );
};
