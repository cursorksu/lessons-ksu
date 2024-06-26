import React, { useCallback, useEffect, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { FormField } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { NavLink } from 'react-router-dom';
import { ShadowCardStyled } from '../../pages/MainContentStyled';
import { useAssignGroupToChurch } from '../../api/refs/useAssignGroupToChurch';
import { useAssignGroupTeacher } from '../../api/refs/useAssignGroupTeacherю';
import { useParams } from 'react-router';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useGetEntityListByIds } from '../../api/entity/useGetEntityListByIds';
import { setMessage } from '../../store/notificationReducer';

const initialValues = {
  title: '',
  description: '',
  church: '',
  teachers: [],
  students: [],
};

export const GroupList = ({ isAuth, church, onEdit }) => {
  const dispatch = useDispatch();
  const { teachers } = useSelector(state => state.lessonData);
  const { t } = useTranslation('tr');
  const { churchId } = useParams();
  const { getEntities: getGroups, entities: groups } = useGetEntityListByIds('group');
  const { addGroupToChurch, removeGroupFromChurch } = useAssignGroupToChurch();
  const { addTeacherToGroup, removeTeacherFromGroup } = useAssignGroupTeacher();
  const { createEntity } = useCreateEntity('group');
  const [isFormShown, setIsFormShown] = useState(false);
  const [, forceUpdate] = useState();

  useEffect(() => {
    church?.groups && getGroups(church?.groups);
  }, [church, getGroups]);

  const { reset, control, getValues, setValue } = useForm({
    defaultValues: {
      ...initialValues,
      church: churchId,
    },
    caches: false });

  const handleChangeTeachersList = useCallback(async (data) => {
    setValue('teachers', data.value);
  }, [setValue]);

  const handleAddGroup = useCallback(async () => {
    const newData = getValues();

    try {
      if (!newData.teachers || !Array.isArray(newData.teachers)) {
        throw new Error('Teachers field is missing or not an array');
      }

      const createdGroupId = await createEntity(newData);
      await addGroupToChurch(churchId, createdGroupId);

      const teacherPromises = newData.teachers.map((teacherId) => {
        return addTeacherToGroup(createdGroupId, teacherId);
      });
      await Promise.all(teacherPromises);

      reset();
      onEdit();
      setIsFormShown(false);
      forceUpdate();
    } catch (error) {
      dispatch(
        setMessage({
          type: 'error',
          message: {
            title: `Error in creation group ${error.message}:`,
            description: error.message,
          },
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createEntity, getValues, onEdit, reset]);

  const deleteGroup = useCallback(async (group) => {
    try {
      for (const teacherId of group.teachers) {
        await removeTeacherFromGroup(group.id, teacherId);
      }

      await removeGroupFromChurch(churchId, group.id);
      onEdit();
      if (church?.groups?.length < 1) {
        await getGroups([]);
      }
    } catch (e) {
      throw new Error(e);
    }
  }, [
    removeTeacherFromGroup,
    removeGroupFromChurch,
    onEdit,
    getGroups,
    church,
    churchId
  ]);

  const removeTeacher = useCallback(async (groupId, teacherId) => {
    await removeTeacherFromGroup(groupId, teacherId);
    await getGroups(church?.groups);
    forceUpdate();
  }, [removeTeacherFromGroup, church, getGroups]);

  const getTeacherName = useCallback((teacherId) => {
    const teacherObj = teachers?.find(teacher => teacherId === teacher.uid);
    return teacherObj?.firstName ? `${teacherObj?.firstName} ${teacherObj?.lastName}` : teacherObj?.fullName;
  }, [teachers]);

  return (
    <InfoBlockStyled>
      <div>
        <div className="d-flex">
          <h2 className="title">{t('group.title')}</h2>
          {isAuth && (
            <ButtonIconStyled onClick={() => setIsFormShown(prev => !prev)}>
              {!isFormShown ? '+' : '-'}
            </ButtonIconStyled>
          )}
        </div>

        {isFormShown && (
          <div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled className="label">{t(`group.label.title`)}</LabelStyled>
                  <InputStyled
                    value={field.value}
                    {...field}
                    placeholder={t(`group.placeholder.title`)}
                  />
                </FormField>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled className="label">{t(`group.label.description`)}</LabelStyled>
                  <InputStyled
                    value={field.value}
                    {...field}
                    placeholder={t(`group.placeholder.description`)}
                  />
                </FormField>
              )}
            />
            <Controller
              name="teachers"
              control={control}
              render={({ field }) => (
                <FormField>
                  <LabelStyled className="label">{t('group.label.teachers')}</LabelStyled>
                  <KsuTeachersDropdown
                    value={field.value}
                    placeholder={t('group.placeholder.teachers')}
                    multiple
                    search
                    selection
                    pointing={'top right'}
                    onChange={handleChangeTeachersList}
                  />
                </FormField>
              )}
            />
            <div className='button-wrapper'>
              <ButtonStyled
                className="ksu-button"
                onClick={handleAddGroup}
              >
                Add
              </ButtonStyled>
              <ButtonStyled
                className="ksu-button"
                onClick={() => setIsFormShown(false)}
              >
                Cancel
              </ButtonStyled>
            </div>
          </div>
        )}

        <ul className='groups-card-lis'>
          {groups?.map(el => (
            <ShadowCardStyled className="vertical-card group" key={el.id}>
              {isAuth && <NavLink to={`/group/${el.id}`}>go to group</NavLink>}
              <div>
                <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
                <h2>{el.title}</h2>
                <h4 className="subtitle">{el.description}</h4>
                {el?.teachers?.length
                  ? (
                    <ul>
                      <li><b>Teachers:</b></li>
                      {el?.teachers?.map(teacherId => {
                        return <li key={teacherId ?? ''}>
                          {getTeacherName(teacherId)}
                          {isAuth && (
                            <ButtonIconStyled onClick={() => removeTeacher(el.id, teacherId)}>
                              <CloseIcon />
                            </ButtonIconStyled>
                          )}
                        </li>;
                      })}
                      <li><b>Students:</b> {el?.students?.length}</li>
                    </ul>
                  )
                  : <h5>Вчителі не доєднані</h5>
                }

              </div>
              {isAuth && (
                <ButtonIconStyled onClick={() => deleteGroup(el)}>
                  <CloseIcon />
                </ButtonIconStyled>
              )}
            </ShadowCardStyled>
          ))}
        </ul>
      </div>
    </InfoBlockStyled>
  );
};
