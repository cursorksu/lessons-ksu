import React, { useCallback, useEffect, useState } from 'react';
import { InfoBlockStyled } from '../InfoBlockStyled';
import { ButtonIconStyled, ButtonStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
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
import { VeremChips } from './VeremChurchContent';
import { GroupTeachersList } from './GroupTeachersList';
import { ChurchItemStyled, GroupItemStyled } from './style';
import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import clsx from 'clsx';
import { DeleteConfirmationModal } from '../DeleteConfirmationModal/DeleteConfirmationModal';

const initialValues = {
    title: '',
    description: '',
    church: '',
    teachers: [],
    students: [],
};

export const GroupList = ({ isAuth, church, onEdit }) => {
    const dispatch = useDispatch();
    const { teachers } = useSelector((state) => state.lessonData);
    const { t } = useTranslation('tr');
    const { churchId } = useParams();
    const { getEntities: getGroups, entities: groups } =
        useGetEntityListByIds('group');

    const { addGroupToChurch, removeGroupFromChurch } = useAssignGroupToChurch();
    const { addTeacherToGroup, removeTeacherFromGroup } = useAssignGroupTeacher();
    const { createEntity } = useCreateEntity('group');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const [ , forceUpdate ] = useState();

    useEffect(() => {
        church?.groups && getGroups(church?.groups);
    }, [ church, getGroups ]);

    const { reset, control, getValues, setValue } = useForm({
        defaultValues: {
            ...initialValues,
            church: churchId,
        },
        caches: false,
    });

    const handleChangeTeachersList = useCallback(
        async (data) => {
            setValue('teachers', data.value);
        },
        [ setValue ]
    );

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
    }, [ createEntity, getValues, onEdit, reset ]);

    const deleteGroup = useCallback(
        async (group) => {
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
        },
        [
            removeTeacherFromGroup,
            removeGroupFromChurch,
            onEdit,
            getGroups,
            church,
            churchId,
        ]
    );

    const removeTeacher = useCallback(
        async (groupId, teacherId) => {
            await removeTeacherFromGroup(groupId, teacherId);
            await getGroups(church?.groups);
            forceUpdate();
        },
        [ removeTeacherFromGroup, church, getGroups ]
    );

    const getTeacherName = useCallback(
        (teacherId) => {
            const teacherObj = teachers?.find((teacher) => teacherId === teacher.uid);
            return teacherObj?.firstName
                   ? `${teacherObj?.firstName} ${teacherObj?.lastName}`
                   : teacherObj?.fullName;
        },
        [ teachers ]
    );

    return (
        <>
            <div>
                <div className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}>
                    <VeremChips>{t('church.labels.groups')}</VeremChips>
                    {isAuth && (
                        <ButtonIconStyled onClick={() => setIsFormShown((prev) => !prev)}>
                            {!isFormShown ? <AddIcon/> : <RemoveIcon/>}
                        </ButtonIconStyled>
                    )}
                </div>

                {isFormShown && (
                    <FormStyled>
                        <Controller
                            name="title"
                            control={control}
                            render={({ field }) => (
                                <InputFieldStyled>
                                    <LabelStyled className="label">
                                        {t(`group.label.title`)}
                                    </LabelStyled>
                                    <InputStyled
                                        value={field.value}
                                        {...field}
                                        placeholder={t(`group.placeholder.title`)}
                                    />
                                </InputFieldStyled>
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <InputFieldStyled>
                                    <LabelStyled className="label">
                                        {t(`group.label.description`)}
                                    </LabelStyled>
                                    <InputStyled
                                        value={field.value}
                                        {...field}
                                        placeholder={t(`group.placeholder.description`)}
                                    />
                                </InputFieldStyled>
                            )}
                        />
                        <Controller
                            name="teachers"
                            control={control}
                            render={({ field }) => (
                                <InputFieldStyled>
                                    <LabelStyled className="label">
                                        {t('group.label.teachers')}
                                    </LabelStyled>
                                    <KsuTeachersDropdown
                                        value={field.value}
                                        placeholder={t('group.placeholder.teachers')}
                                        multiple
                                        search
                                        selection
                                        pointing={'top right'}
                                        onChange={handleChangeTeachersList}
                                    />
                                </InputFieldStyled>
                            )}
                        />
                        <div className="button-wrapper">
                            <ButtonStyled className="ksu-button" onClick={handleAddGroup}>
                                Add
                            </ButtonStyled>
                            <ButtonStyled
                                className="ksu-button"
                                onClick={() => setIsFormShown(false)}>
                                Cancel
                            </ButtonStyled>
                        </div>
                    </FormStyled>
                )}
                {groups?.map((el) => (
                    <GroupItemStyled key={el.id}>
                        {isAuth && (
                            <div className={'d-flex-between'}>
                                <NavLink to={`/group/${el.id}`} className={'group-link'}>
                                    go to group
                                </NavLink>
                                <DeleteConfirmationModal
                                    modalTitle={`${t('modal.title.deleteTeacher')} ${el?.title.toString()}`}
                                    modalContent={`${t('modal.teacherDelete')}`}
                                    onConfirm={() => deleteGroup(el)}
                                />
                            </div>
                        )}
                        <div>
                            <img src={el?.avatar && el?.avatar} alt={el.firstName}/>
                            <h1 className={'group-title'}>{el.title}</h1>
                            <h3>{el.description}</h3>
                            {el?.teachers?.length
                             ? (
                                 <div>
                                     <GroupTeachersList idsList={el?.teachers}/>
                                     <div className="content-block">
                                         <h3>Students:</h3> {el?.students?.length}
                                     </div>
                                 </div>
                             )
                             : (
                                 <h5>Вчителі не доєднані</h5>
                             )}
                        </div>
                    </GroupItemStyled>
                ))}
            </div>
        </>
    );
};
