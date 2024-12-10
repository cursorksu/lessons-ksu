import React, { useCallback, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { useAssignTeacherChurch } from '../../api/refs/useAssignTeacherChurch';
import { TeacherItem } from './TeacherItem';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import { LabelStyled } from '../InputStyled';
import { useTranslation } from 'react-i18next';

export const TeachersList = ({ isAuth, church, onEdit }) => {
  const { t } = useTranslation('tr');
  const { addTeacherToChurch, removeTeacherFromChurch } =
    useAssignTeacherChurch();
  const [isFormShown, setIsFormShown] = useState(false);

  const handleRemoveTeacher = useCallback(
    async (teacherId) => {
      await removeTeacherFromChurch(church.id, teacherId);
      onEdit();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [church]
  );

  const [teacherIdxList, setTeacherIdxList] = useState([]);
  const handleChangeTeacherList = async (data) => {
    setTeacherIdxList(data.value);
  };

  const handleAddTeachers = useCallback(async () => {
    for (const teacherId of teacherIdxList) {
      await addTeacherToChurch(church.id, teacherId);
    }

    setIsFormShown(false);
    onEdit();
  }, [church, addTeacherToChurch, onEdit, teacherIdxList]);

  return (
    <InfoBlockStyled>
      <div>
        <div className="d-flex">
          <h2 className="title">Our Teachers</h2>
          {isAuth && (
            <ButtonIconStyled onClick={() => setIsFormShown((prev) => !prev)}>
              {!isFormShown ? '+' : '-'}
            </ButtonIconStyled>
          )}
        </div>

        {isFormShown
? (
          <div>
            <LabelStyled className="label">
              {t('group.label.teachers')}
            </LabelStyled>
            <KsuTeachersDropdown
              value={teacherIdxList}
              placeholder={'Select teacher'}
              multiple
              search
              selection
              pointing={'top right'}
              onChange={handleChangeTeacherList}
            />
            <div className="button-wrapper">
              <ButtonStyled className="ksu-button" onClick={handleAddTeachers}>
                Add
              </ButtonStyled>
              <ButtonStyled
                className="ksu-button"
                onClick={() => setIsFormShown(false)}>
                Cancel
              </ButtonStyled>
            </div>
          </div>
        )
: null}

        <ul className="vertical-card-lis">
          {church?.teachers?.length > 0 &&
            church.teachers.map((teacherId) => (
              <TeacherItem
                key={teacherId}
                entityName={'users'}
                id={teacherId}
                removeEntity={handleRemoveTeacher}
                isAuth={isAuth}
              />
            ))}
        </ul>
      </div>
    </InfoBlockStyled>
  );
};
