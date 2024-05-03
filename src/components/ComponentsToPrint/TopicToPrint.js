import React, { useRef, useState } from 'react';
import { KsuCard } from '../KsuCard';
import { FormField, Popup } from 'semantic-ui-react';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { ReactComponent as PrintIcon } from '../../assets/print.svg';
import { ReactComponent as ScreenIcon } from '../../assets/screen.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg';
import { useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Editor from '../TextEditor';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { HTMLRenderer } from '../HTMLRender/HTMLRender';
import { InputStyled } from '../InputStyled';
import { DynamicList } from '../DynamicList/DynamicList';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useReactToPrint } from 'react-to-print';
import clsx from 'clsx';

export const TopicToPrint = React.forwardRef(({ lesson, onChangeConfirm }) => {
  const { editEntity } = useEditEntity('lessons');
  const [isMaterialEdit, setIsMaterialEdit] = useState(false);
  const [isBibleEdit, setIsBibleEdit] = useState(false);
  const [isTopicEdit, setIsTopicEdit] = useState(false);
  const [isGoalEdit, setIsGoalEdit] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const {control, getValues, setValue, reset} = useForm({
    defaultValues: {
      goal: lesson?.goal,
      bibleText: lesson?.bibleText,
      bibleQuote: lesson?.bibleQuote,
      material: lesson?.material,
      topic: lesson?.topic,
    },
    caches: false
  });

  const { user } = useSelector((state) => state.auth);

  const editLessonHandler = (fieldName) => {
    const newData = {
      id: lesson?.id,
    };

    if (fieldName === 'bible') {
      newData.bibleText = getValues('bibleText');
      newData.bibleQuote = getValues('bibleQuote');
    } else {
      newData[fieldName] = getValues(fieldName);
    }

    editEntity(newData)
      .then(() => {
        onChangeConfirm();
        setIsGoalEdit(false);
        setIsBibleEdit(false);
        setIsMaterialEdit(false);
        setIsTopicEdit(false);
        reset({
          goal: lesson?.goal,
          bibleText: lesson?.bibleText,
          bibleQuote: lesson?.bibleQuote,
          material: lesson?.material,
          topic: lesson?.topic,
        });
      })
      .catch((err) => new Error(err));
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <InfoBlockStyled>
      <section className='ksu-content no-margin' ref={componentRef}>
        <aside className='aside-wrapper'>
          <div>
            <div
              className={clsx({
                'image-wrapper': true,
                'full-screen': isFullScreen,
              })}
            >
              {!isFullScreen
                ? (
                  <ButtonIconStyled onClick={() => setIsFullScreen(true)}>
                    <FullScreenIcon />
                  </ButtonIconStyled>
                )
                : (
                  <ButtonIconStyled onClick={() => setIsFullScreen(false)}>
                    <ScreenIcon />
                  </ButtonIconStyled>
                )}
              <img
                src={lesson?.imageUrl}
                alt={lesson?.title}
              />
            </div>
            <div>
              <div
                style={{
                  marginBottom: 10,
                  paddingLeft: 10,
                }}
              >
                <a
                  href="http://allbible.info"
                  title="Библия онлайн. Подкрепись!"
                  style={{
                    fontFamily: 'Georgia,\'Times New Roman\',Times,serif',
                    fontStyle:'italic',
                    fontSize: 18,
                    color: '#000',
                  }}>
                Случайный стих из Библии</a>
              </div>
              <iframe
                id="randomVerseIframe"
                src="http://allbible.info/ajax/randomverse/" width="300"
                height="200" title="Подкрепись! Библия онлайн." frameBorder="0"
                scrolling="no"></iframe>
              <form action="http://allbible.info/search/" method="post">
                <input type="hidden" name="translation" value="sinodal" />
                <input type="hidden" name="target" value="all" />
                <input type="text" name="query" />
                <input type="submit" value="Найти в Библии" />
              </form>
            </div>
            <KsuCard
              title={'Мета уроку'}
              action={user?.uid && (
                !isGoalEdit
                  ? (
                    <ButtonIconStyled onClick={() => setIsGoalEdit(true)}>
                      <EditIcon />
                    </ButtonIconStyled>
                  )
                  : (
                    <ButtonIconStyled onClick={() => editLessonHandler('goal')}>
                      <SaveIcon />
                    </ButtonIconStyled>
                  )
              )}
            >
              <div>
                {isGoalEdit
                  ? (
                    <Controller
                      name="goal"
                      control={control}
                      render={({ field }) => (
                        <FormField>
                          <InputStyled
                            name='goal'
                            placeholder={'Почніть вводити щось...'}
                            onChange={(data) => setValue('goal', data)}
                            {...field}
                          />
                        </FormField>
                      )}
                    />
                  )
                  : <HTMLRenderer htmlContent={lesson?.goal} />
                }
              </div>
            </KsuCard>
            <KsuCard
              title={'Ключове місце Біблії'}
              action={user?.uid && (
                !isBibleEdit
                  ? (
                    <ButtonIconStyled onClick={() => setIsBibleEdit(true)}>
                      <EditIcon />
                    </ButtonIconStyled>
                  )
                  : (
                    <ButtonIconStyled onClick={() => editLessonHandler('bible')}>
                      <SaveIcon />
                    </ButtonIconStyled>
                  )
              )}
            >
              <div>
                {isBibleEdit
                  ? (
                    <>
                      <Controller
                        name="bibleText"
                        control={control}
                        render={({ field }) => (
                          <FormField>
                            <InputStyled
                              placeholder={'Біблійний текст'}
                              onChange={({ target }) => setValue('bibleText', target.value)}
                              {...field}
                            />
                          </FormField>
                        )}
                      />
                      <Controller
                        name="bibleQuote"
                        control={control}
                        render={({ field }) => (
                          <FormField>
                            <InputStyled
                              placeholder={'Де написаний'}
                              onChange={({ target }) => setValue('bibleQuote', target.value)}
                              {...field}
                            />
                          </FormField>
                        )}
                      />
                    </>
                  )
                  : (
                    <div>
                      <p>{lesson?.bibleText}</p>
                      <p><b>{lesson?.bibleQuote}</b></p>
                    </div>
                  )
                }
              </div>
            </KsuCard>
            <KsuCard
              title={'Що треба взяти'}
              action={user?.uid && (
                !isMaterialEdit
                  ? (
                    <ButtonIconStyled onClick={() => setIsMaterialEdit(true)}>
                      <EditIcon />
                    </ButtonIconStyled>
                  )
                  : (
                    <ButtonIconStyled onClick={() => editLessonHandler('material')}>
                      <SaveIcon />
                    </ButtonIconStyled>
                  )
              )}
            >
              <div>
                {isMaterialEdit
                  ? (
                    <Controller
                      name="material"
                      control={control}
                      render={({ field }) => (
                        <FormField>
                          <DynamicList
                            field={field}
                            initialField={field.value}
                            onChangeField={data => setValue('material', data.value)}
                          />
                        </FormField>
                      )}
                    />
                  )
                  : (
                    <ul>
                      {lesson?.material?.map(el => (
                        <li>{el.value}</li>
                      ))}
                    </ul>
                  )
                }
              </div>
            </KsuCard>
          </div>
        </aside>
        <section className='content-wrapper'>
          <div className='action'>
            <Popup
              trigger={(
                <ButtonIconStyled onClick={handlePrint}>
                  <PrintIcon />
                </ButtonIconStyled>
              )}
              content='Надрукувати цей урок'
            />
            {user?.uid && (
              !isTopicEdit
                ? (
                  <ButtonIconStyled onClick={() => setIsTopicEdit(true)}>
                    <EditIcon />
                  </ButtonIconStyled>
                )
                : (
                  <ButtonIconStyled onClick={() => editLessonHandler('topic')}>
                    <SaveIcon />
                  </ButtonIconStyled>
                )
            )}
          </div>
          <div className='action-top'>
            <h2 className='title'>{lesson?.title}</h2>
            {isTopicEdit
              ? (
                <Controller
                  name="topic"
                  control={control}
                  render={({ field }) => (
                    <FormField>
                      <Editor
                        placeholder={'Почніть вводити текст...'}
                        onChange={(data) => setValue('topic', data)}
                        value={field.value}
                      />
                    </FormField>
                  )}
                />
              )
              : (<HTMLRenderer htmlContent={lesson?.topic} />)
            }
          </div>
        </section>
      </section>
    </InfoBlockStyled>
  );
});
