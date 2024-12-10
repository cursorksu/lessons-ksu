import { FormField, Popup } from 'semantic-ui-react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as PrintIcon } from '../../assets/print.svg';
import { ReactComponent as ScreenIcon } from '../../assets/screen.svg';
import { ReactComponent as FullScreenIcon } from '../../assets/full-screen.svg';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { useParams } from 'react-router';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { useReactToPrint } from 'react-to-print';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { Controller, useForm } from 'react-hook-form';
import Editor from '../TextEditor';
import { HTMLRenderer } from '../HTMLRender/HTMLRender';
import { useAssignEntityToLesson } from '../../api/refs/useAssignEntityToLesson';
import clsx from 'clsx';
import { InputStyled, LabelStyled } from '../InputStyled';

const INITIAL_VALUES = {
  text: '',
  title: '',
  imageUrl: '',
};

export const LessonEntity = ({ entityName, lesson }) => {
  const { lessonId } = useParams();
  const { getEntities, entities } = useGetEntityListByIds(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { addEntityToArrayField, removeEntityFromArrayField } =
    useAssignEntityToLesson(entityName);

  const { control, getValues, setValue, reset } = useForm({
    defaultValues: INITIAL_VALUES,
    caches: false,
  });

  useEffect(() => {
    lesson &&
      lesson[entityName]?.length &&
      getEntities(lesson[entityName]).then(() => {});
  }, [lesson, entityName, getEntities]);

  const [isFormShown, setIsFormShown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleEntityCreate = async () => {
    try {
      const newValue = getValues();
      const id = await createEntity(newValue);

      if (id === undefined) {
        throw new Error(`${entityName} Did Not Created!`);
      }
      await addEntityToArrayField(entityName, id, lessonId);

      setIsFormShown(false);
      reset(INITIAL_VALUES);
    } catch (err) {
      throw new Error(err);
    }
  };

  const removeEntity = async (entityId) => {
    await removeEntityFromArrayField(entityName, entityId, lessonId);
  };

  const handleCancel = () => {
    reset();
    setIsFormShown(false);
  };

  return (
    <InfoBlockStyled>
      <section
        className={`ksu-content no-margin ${entityName}`}
        ref={componentRef}>
        <aside className="aside-wrapper">
          {['creative', 'subject', 'food'].includes(entityName) && (
            <div
              className={clsx({
                'image-wrapper': true,
                'full-screen': isFullScreen,
              })}>
              <div className="print-hide">
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
              </div>
              {entities && entities[0]?.imageUrl && (
                <img src={entities[0].imageUrl} alt={entityName} />
              )}
              {!(entities && entities[0]?.imageUrl) && (
                <div className="image-placeholder" />
              )}
            </div>
          )}
        </aside>

        <section className="content-wrapper">
          <div>
            <div className="action print-hide">
              <Popup
                trigger={
                  !isFormShown && (
                    <ButtonIconStyled onClick={handlePrint}>
                      <PrintIcon />
                    </ButtonIconStyled>
                  )
                }
                content="Надрукувати цей урок"
              />
              {user?.uid && lesson?.createdBy.uid === user?.uid && (
                <ButtonStyled onClick={() => setIsFormShown(true)}>
                  Create {entityName}
                </ButtonStyled>
              )}
            </div>
            <div className="action-top">
              {isFormShown
? (
                <div className="print-hide">
                  <Controller
                    name={'title'}
                    control={control}
                    render={({ field }) => (
                      <FormField>
                        <LabelStyled>Назва</LabelStyled>
                        <InputStyled {...field} />
                      </FormField>
                    )}
                  />
                  <Controller
                    name={'imageUrl'}
                    control={control}
                    render={({ field }) => (
                      <FormField>
                        <LabelStyled>Посилання на зображення</LabelStyled>
                        <InputStyled {...field} />
                      </FormField>
                    )}
                  />
                  <Controller
                    name={'text'}
                    control={control}
                    render={({ field }) => (
                      <FormField>
                        <LabelStyled>Контент</LabelStyled>
                        <Editor
                          {...field}
                          placeholder={'Почніть вводити текст...'}
                          onChange={(data) => setValue('text', data)}
                          value={field.value}
                        />
                      </FormField>
                    )}
                  />
                  <ButtonStyled onClick={handleCancel}>Cancel</ButtonStyled>
                  <ButtonStyled onClick={handleEntityCreate}>Save</ButtonStyled>
                </div>
              )
: (
                entities.map((el) => (
                  <div key={el.id}>
                    <div className="item-action print-hide">
                      <b>{el.title}</b>
                      {user?.uid && lesson?.createdBy.uid === user?.uid && (
                        <Popup
                          trigger={
                            <ButtonIconStyled
                              onClick={() => removeEntity(el.id)}>
                              <DeleteIcon />
                            </ButtonIconStyled>
                          }
                          content={`Відкріпити ${entityName} від урока`}
                        />
                      )}
                    </div>
                    <HTMLRenderer htmlContent={el.text} />
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </section>
    </InfoBlockStyled>
  );
};
