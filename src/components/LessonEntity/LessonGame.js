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
import { KsuDropdownDynamic } from '../KsuDropdown/KsuDropdownDynamic';
import { KsuDropdown } from '../KsuDropdown';

export const LessonGame = ({ entityName, lesson }) => {
  const { lessonId } = useParams();
  const { getEntities, entities } = useGetEntityListByIds(entityName);
  const { createEntity } = useCreateEntity(entityName);
  const { editEntity } = useEditEntity('lessons');
  const { addEntityToArrayField, removeEntityFromArrayField } = useAssignEntityToLesson(entityName);

  const {control, getValues, setValue, reset} = useForm({
    defaultValues: {
      games: [],
    },
    caches: false
  });

  useEffect(() => {

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
    <section className='content-wrapper'>
      {user?.uid && (lesson?.createdBy.uid === user?.uid) &&(
        <div>
          <h2>{`Цей урок ще не містить ${entityName}! Ви можете створити  ${entityName}`}</h2>

          <Controller
            name="games"
            control={control}
            render={({ field }) => (
              <KsuDropdown
                entityName={'game'}
                onChange={data => field.onChange(data.value)}
                placeholder={'Виберіть одну або декілька ігор'}
                multiple
                field={field}
              />
            )}
          />
        </div>
      )}
    </section>
  );
};
