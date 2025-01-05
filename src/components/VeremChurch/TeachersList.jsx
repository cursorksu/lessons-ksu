import React, { useCallback, useState } from 'react';
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled';
import { useAssignTeacherChurch } from '../../api/refs/useAssignTeacherChurch';
import { TeacherItem } from './TeacherItem';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import { useTranslation } from 'react-i18next';
import { VeremChips } from './VeremChurchContent';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import clsx from 'clsx';
import { useInvite } from '../../api/invite/createInvite';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';

export const TeachersList = ({ isAuth, church, onEdit }) => {
    const { t } = useTranslation('tr');
    const { createInvite } = useInvite();
    const dispatch = useDispatch();
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

    const onCopyUrl = useCallback(async () => {
        const url = await createInvite(church?.id);
        try {
            await navigator.clipboard.writeText(url);
            dispatch(
                setMessage({
                    type: 'success',
                    message: {
                        title: t('Посилання успішно скопійоване'),
                        description: `${url} відправте це посилання поштою або зручним вам меседжером`,
                    },
                })
            );
        } catch (error) {
            dispatch(
                setMessage({
                    type: 'success',
                    message: {
                        title: t('Посилання не було створене'),
                        description: `Перевірте інтернет з'єднання або спробуйте пізніше. ${error.message}`,
                    },
                })
            );
        }
    }, [ church ]);


    return (
        <>
            <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}
                 style={{ marginBottom: '20px' }}>
                <VeremChips>{`${t('church.labels.teachers')}`}</VeremChips>
                {isAuth && (
                    <ButtonIconMiniStyled onClick={() => setIsFormShown((prev) => !prev)}>
                        {!isFormShown ? <AddIcon/> : <RemoveIcon/>}
                    </ButtonIconMiniStyled>
                )}
            </div>
            <div>
                {isFormShown
                 ? (
                     <div>
                         <ButtonStyled
                             style={{ marginBottom: '10px' }}
                             onClick={onCopyUrl}
                         >
                             Скопіювати посилання для запрошення вчителя
                         </ButtonStyled>
                         <KsuTeachersDropdown
                             value={teacherIdxList}
                             placeholder={'Select teacher'}
                             multiple
                             search
                             selection
                             pointing={'top right'}
                             onChange={handleChangeTeacherList}
                         />
                         <div className="button-wrapper"
                              style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                             <ButtonStyled
                                 className="secondary"
                                 onClick={() => setIsFormShown(false)}>
                                 {t('button.cancel')}
                             </ButtonStyled>
                             <ButtonStyled onClick={handleAddTeachers}>
                                 {t('button.add')}
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
