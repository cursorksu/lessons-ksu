import { FormField, Popup } from 'semantic-ui-react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ReactComponent as SaveIcon } from '../../assets/save.svg';
import { ReactComponent as PrintIcon } from '../../assets/print.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
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
import {
  useAssignEntityToLesson
} from '../../api/refs/useAssignEntityToLesson';
import { KsuCard } from '../KsuCard';
import { useEditEntity } from '../../api/entity/useEditEntity';
import { DynamicList } from '../DynamicList/DynamicList';
import { LessonGame } from './LessonGame';

export const LessonEntity = ({ entityName, lesson }) => {
  const { lessonId } = useParams();
  const { getEntities, entities } = useGetEntityListByIds(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { editEntity } = useEditEntity('lessons');
  const { addEntityToArrayField, removeEntityFromArrayField } = useAssignEntityToLesson(entityName);

  const {control, getValues, setValue, reset} = useForm({
    defaultValues: {
      text: '',
      material: lesson?.material || [],
    },
    caches: false
  });

  useEffect(() => {
    lesson && lesson[entityName]?.length && getEntities(lesson[entityName])
      .then(() => {});
  }, [lesson, entityName, getEntities]);

  const [isMaterialsEdit, setIsMaterialsEdit] = useState(false);
  const [isFormShown, setIsFormShown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const editMaterialsHandler = async () => {
    const newData = {
      id: lessonId,
    };
    newData.materials = getValues('material');
    await editEntity(newData)
      .then(() => {
        reset({
          text: '',
          material: [],
        });
        setIsMaterialsEdit(false);
      })
      .catch((err) => new Error(err));
  };

  const handleEntityCreate = async () => {
    const newValue = getValues();
    const id = await createEntity({  text: newValue.text });
    await addEntityToArrayField(entityName, id, lessonId);

    setIsFormShown(false);
    reset({
      text: '',
      material: [],
    });
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
      <section className='ksu-content no-margin' ref={componentRef}>
        <aside className='aside-wrapper'>
          <KsuCard
            title={'Список речей для проведення'}
            action={user?.uid && (
              !isMaterialsEdit
                ? (
                  <ButtonIconStyled onClick={() => setIsMaterialsEdit(true)}>
                    <EditIcon />
                  </ButtonIconStyled>
                )
                : (
                  <ButtonIconStyled onClick={() => editMaterialsHandler('materials')}>
                    <SaveIcon />
                  </ButtonIconStyled>
                )
            )}
          >
            <div>
              {isMaterialsEdit
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
        </aside>

        <section className='content-wrapper'>
          {lesson && lesson[entityName]?.length < 1
            ? <h2>{`Цей урок ще не містить ${entityName}! Ви можете створити  ${entityName}`}</h2>
            : (
              <div>
                <div className='action'>
                  <Popup
                    trigger={(!isFormShown &&
                      <ButtonIconStyled onClick={handlePrint}>
                        <PrintIcon />
                      </ButtonIconStyled>
                    )}
                    content='Надрукувати цей урок'
                  />
                  {user?.uid && (lesson?.createdBy.uid === user?.uid) &&(
                    <ButtonStyled onClick={() => setIsFormShown(true)}>
                      Create {entityName}
                    </ButtonStyled>
                  )}
                </div>
                <div className='action-top'>
                  <LessonGame entityName={'game'} lesson={lesson}/>
                  {isFormShown
                    ? (
                      <>
                        <Controller
                          name={'text'}
                          control={control}
                          render={({ field }) => (
                            <FormField>
                              <Editor
                                {...field}
                                placeholder={'Почніть вводити текст...'}
                                onChange={(data) => setValue('text', data)}
                                value={field.value}
                              />
                            </FormField>
                          )}
                        />
                        <ButtonStyled onClick={handleCancel}>
                          Cancel
                        </ButtonStyled>
                        <ButtonStyled onClick={handleEntityCreate}>
                          Save
                        </ButtonStyled>
                      </>
                    )
                    : entities.map(el => (
                      <div key={el.id}>
                        <div className="item-action">
                          <b>{el.title}</b>
                          {user?.uid && (lesson?.createdBy.uid === user?.uid) &&(
                            <Popup
                              trigger={(
                                <ButtonIconStyled onClick={() => removeEntity(el.id)}>
                                  <DeleteIcon />
                                </ButtonIconStyled>
                              )}
                              content={`Відкріпити ${entityName} від урока`}
                            />
                          )}
                        </div>
                        <HTMLRenderer htmlContent={el.text} />
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
        </section>
      </section>
    </InfoBlockStyled>
  );
};
