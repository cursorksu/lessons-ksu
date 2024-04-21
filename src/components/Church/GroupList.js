import { useEditEntity } from '../../api/entity/useEditEntity';
import React, { useCallback, useEffect, useState } from 'react';
import { InfoBlockStyled, InfoItemStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown, FormField } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { StyledDropdown } from '../KsuDropdown/StyledDropdown';
import { getOption } from '../../utils/getOption';
import { NavLink } from 'react-router-dom';
import { useGetEntity } from '../../api/entity/useGetEntity';

const initialValues = {
  title: '',
  description: '',
  teachers: [],
  students: [],
};

export const GroupList = ({ isAuth, groups, church, onEdit }) => {
  const { t } = useTranslation('tr');
  const { editEntity } = useEditEntity('church');
  const { editEntity: editTeacherEntity } = useEditEntity('users');
  const { createEntity } = useCreateEntity('group');
  const [isFormShown, setIsFormShown] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const { getEntityById } = useGetEntity('users');

  useEffect(() => {
    setTeachers(church?.teachers?.map(el => getOption(el)));
  }, [church]);

  const { reset, control, getValues, setValue } = useForm({
    defaultValues: initialValues,
    caches: false });

  const handleRemoveTeacher = useCallback(async (id) => {
    const groupsNew = groups?.filter(el => el.id !== id);
    const newData = {
      ...church,
      teachers: church?.teachers?.map(el => el.id),
      groups: groupsNew.map(el => el.id)
    };
    await editEntity(newData);
    onEdit();
  }, [church, groups, onEdit, editEntity]);

  const handleChangeGropeList = useCallback(async (e, data) => {
    setValue('teachers', data.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church, groups, setValue]);

  const handleAddGroup = useCallback(async () => {
    const newData = getValues();
    await createEntity(newData).then((createdGroupId) => {
      const newData = {
        ...church,
        teachers: church?.teachers?.map(el => el.id),
        groups: [
          ...groups?.map(el => el.id),
          createdGroupId,
        ]
      };
      editEntity(newData).then(async () => {
        for (const teacherId of newData.teachers) {
          const teacher = await getEntityById(teacherId);
          await editTeacherEntity({
            ...teacher,
            groups: teacher ? [...teacher.groups, createdGroupId] : [],
          });
        }
        setIsFormShown(false);
        onEdit();
        reset();
      });
    });
  }, [
    church,
    createEntity,
    editEntity,
    getValues,
    groups,
    onEdit,
    editTeacherEntity,
    getEntityById,
    reset,
  ]);

  const removeTeacherFromGroup = useCallback(async (id) => {
    // eslint-disable-next-line no-console
    console.log(id);
  }, []);

  const getTeacherData = useCallback((id) => {
    const teacherItem = church?.teachers?.find(item => item.id === id);
    return `${teacherItem?.firstName} ${teacherItem?.lastName}`;
  }, [church]);

  return (
    <InfoBlockStyled>
      {isFormShown && (
        <div>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <FormField>
                <LabelStyled>{t(`grope.labels.title`)}</LabelStyled>
                <InputStyled
                  value={field.value}
                  {...field}
                  placeholder={t(`grope.placeholders.title`)}
                />
              </FormField>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <FormField>
                <LabelStyled>{t(`grope.labels.description`)}</LabelStyled>
                <InputStyled
                  value={field.value}
                  {...field}
                  placeholder={t(`grope.placeholders.description`)}
                />
              </FormField>
            )}
          />
          <Controller
            name="teachers"
            control={control}
            render={({ field }) => (
              <FormField>
                <LabelStyled>{t(`grope.labels.teachers`)}</LabelStyled>
                <StyledDropdown>
                  <Dropdown
                    placeholder={`grope.labels.teachers`}
                    fluid
                    multiple={true}
                    search
                    selection
                    onChange={handleChangeGropeList}
                    options={teachers}
                  />
                </StyledDropdown>
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
      <div>
        {isAuth && (
          <ButtonIconStyled onClick={() => setIsFormShown(prev => !prev)}>
            {!isFormShown ? '+' : '-'}
          </ButtonIconStyled>
        )}
        <h2>Our Groups</h2>
        {groups && groups?.length > 0 && groups?.map(el => (
          <InfoItemStyled className="group" key={el.id}>
            {isAuth && <NavLink to={`/group/${el.id}`}>go to group</NavLink>}
            <div>
              <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
              <h2>{el.title}</h2>
              <p>{el.description}</p>
              <ul>
                {el?.teachers?.map(teacher => {
                  return <li key={teacher.toString()}>
                    {getTeacherData(teacher)}
                    <ButtonIconStyled onClick={() => removeTeacherFromGroup(teacher)}>
                      <CloseIcon />
                    </ButtonIconStyled>
                  </li>;
                })}
              </ul>
            </div>
            {isAuth && (
              <ButtonIconStyled onClick={() => handleRemoveTeacher(el.id)}>
                <CloseIcon />
              </ButtonIconStyled>
            )}
          </InfoItemStyled>
        ))}
      </div>
    </InfoBlockStyled>
  );
};
