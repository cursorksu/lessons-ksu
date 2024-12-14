import React, { useCallback, useState } from 'react';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { useAssignTeacherChurch } from '../../api/refs/useAssignTeacherChurch';
import { TeacherItem } from './TeacherItem';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import { useTranslation } from 'react-i18next';
import { VeremChips } from './VeremChurchContent';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import clsx from 'clsx';

export const TeachersList = ({ isAuth, church, onEdit }) => {
    const { t } = useTranslation('tr');
    const { addTeacherToChurch, removeTeacherFromChurch } =
        useAssignTeacherChurch();
    const [ isFormShown, setIsFormShown ] = useState(false);

    const handleRemoveTeacher = useCallback(
        async (teacherId) => {
            await removeTeacherFromChurch(church.id, teacherId);
            onEdit();
        },
        [ church ]
    );

    const [ teacherIdxList, setTeacherIdxList ] = useState([]);
    const handleChangeTeacherList = async (data) => {
        setTeacherIdxList(data.value);
    };

    const handleAddTeachers = useCallback(async () => {
        for (const teacherId of teacherIdxList) {
            await addTeacherToChurch(church.id, teacherId);
        }

        setIsFormShown(false);
        onEdit();
    }, [ church, addTeacherToChurch, onEdit, teacherIdxList ]);

    const onDelete = useCallback(() => {

    });

    return (
        <>
            <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })} style={{ marginBottom: '20px'}}>
                <VeremChips>{`${t('church.labels.teachers')}`}</VeremChips>
                {isAuth && (
                    <ButtonIconStyled onClick={() => setIsFormShown((prev) => !prev)}>
                        {!isFormShown ? <AddIcon/> : <RemoveIcon/>}
                    </ButtonIconStyled>
                )}
            </div>

            <div>
                {isFormShown
                 ? (
                     <div>
                         <KsuTeachersDropdown
                             value={teacherIdxList}
                             placeholder={'Select teacher'}
                             multiple
                             search
                             selection
                             pointing={'top right'}
                             onChange={handleChangeTeacherList}
                         />
                         <div className="button-wrapper"  style={{ marginTop: '20px'}}>
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
                <>
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
                </>
            </div>
        </>
    );
};
