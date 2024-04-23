import React, { useCallback, useEffect, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { StyledDropdown } from '../KsuDropdown/StyledDropdown';
import { Dropdown } from 'semantic-ui-react';
import { getOption } from '../../utils/getOption';
import { useGetAllEntities } from '../../api/entity/useGetAllEntities';
import { useAssignTeacherChurch } from '../../api/reefs/useAssignTeacherChurch';
import { ChurchItem } from './ChurchItem';

export const TeachersList = ({ isAuth, church, onEdit }) => {
  const { addTeacherToChurch, removeTeacherFromChurch } = useAssignTeacherChurch();
  const [isFormShown, setIsFormShown] = useState(false);
  const { getAllEntities } = useGetAllEntities('users');
  const [options, setOptions] = useState([]);

  const handleRemoveTeacher = useCallback(async (teacherId) => {
    await removeTeacherFromChurch(church.id, teacherId);
    onEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church]);

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [teacherIdxList, setTeacherIdxList] = useState([]);
  const handleChangeTeacherList = async (_, data) => {
    setTeacherIdxList(data.value);
    setDropdownIsOpen(false);
  };

  const handleAddTeachers = useCallback(async () => {
    for (const teacherId of teacherIdxList) {
      await addTeacherToChurch(church.id, teacherId);
    }

    setIsFormShown(false);
    onEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [church, addTeacherToChurch, onEdit, teacherIdxList]);

  useEffect(() => {
    getAllEntities().then(data => {
      setOptions(data.map(el => getOption(el, church?.teachers)));
    });
  }, [getAllEntities, church]);

  return (
    <InfoBlockStyled>
      <div>
        <div className="d-flex">
          <h2 className='title'>Our Teachers</h2>
          {isAuth && (
            <ButtonIconStyled onClick={() => setIsFormShown(prev => !prev)}>
              {!isFormShown ? '+' : '-'}
            </ButtonIconStyled>
          )}
        </div>

        {isFormShown
          ? (
            <div>
              <StyledDropdown>
                <Dropdown
                  placeholder={'Select teacher'}
                  fluid
                  open={dropdownIsOpen}
                  onClick={() => setDropdownIsOpen(true)}
                  multiple
                  search
                  selection
                  pointing={'top right'}
                  onChange={handleChangeTeacherList}
                  options={options}
                />
              </StyledDropdown>
              <div className='button-wrapper'>
                <ButtonStyled
                  className="ksu-button"
                  onClick={handleAddTeachers}
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
          )
          : null}

        <ul className='vertical-card-lis'>
          {church?.teachers?.length > 0 && church.teachers.map(teacherId => (
            <ChurchItem
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
