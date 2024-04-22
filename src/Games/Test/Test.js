import { MainLayout } from '../../pages/MainLayout';
import React, { useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../../components/ButtonStyled';
import { answerIds, TestItem } from './components/TestItem';
import { Popup } from 'semantic-ui-react';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { ValidationErrorStyled } from '../../components/ValidationErrorStyled';
const { v4: uuidv4 } = require('uuid');

const initialTest = {
  id: '',
  question: '',
  answer: [
    {
      id: '',
      text: '',
      isTrue: false,
    },
  ],
};
export const Test = () => {
  const [test, setTest] = useState([ {
    id: uuidv4(),
    question: '',
    error: 'error',
    answer: [
      {
        id: uuidv4(),
        text: '',
        isTrue: false,
      },
    ],
  }
  ]);

  const addQuestion = () => {
    setTest(prev => [
      {
        id: uuidv4(),
        question: '',
        answer: [
          {
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

  const handleChangeItem = (id, item) => {
    let changedTest = test.find(el => el.id === id);
    if (typeof item === 'string') {
      changedTest.question = item;
      setTest(prev => prev.map(el =>
        el.id === id
          ? {...el, question: item}
          : el
      ));
    } else {
      if (item.length > 10) return;
      setTest(prev => prev.map(el =>
        el.id === id
          ? {...el, answer: item}
          : el
      ));
    }
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
            <h2 className="title">Створіть тест</h2>
            <ul className="test">
              {test.map((testItem, idx) => (
                <li key={testItem.id} className="test-item">
                  <span><b>{idx + 1}</b> {testItem.question}</span>
                  <ul>
                    {testItem.answer.map((answer, index) => (
                      <li key={answer.id}><b>{answerIds[index]}</b>{answer.text}</li>
                    ))
                    }
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <br/>
          <iframe
            title="gameDescription"
            width="100%"
            height="315"
            frameBorder={null}
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
                {el.error && <ValidationErrorStyled>{el.error}</ValidationErrorStyled>}
                <TestItem
                  item={el}
                  onRemoveItem={onRemoveItem}
                  onChange={handleChangeItem}
                />
              </div>
            );
          })}
          <ButtonStyled onClick={() => {}}>Відмінити</ButtonStyled>
          <ButtonStyled onClick={() => {}}>Зберегти</ButtonStyled>
        </section>
      </section>
    </MainLayout>
  );
};
