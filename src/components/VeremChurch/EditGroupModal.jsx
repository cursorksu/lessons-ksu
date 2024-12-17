import { ReactComponent as AddIcon } from '../../assets/add.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import ModalContent from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalContent';
import { FormStyled, InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import { Controller, useForm } from 'react-hook-form';
import { KsuTeachersDropdown } from '../KsuDropdown/KsuTeachersDropdown';
import ModalActions from 'semantic-ui-react/dist/commonjs/modules/Modal/ModalActions';
import { ButtonStyled } from '../ButtonStyled';
import { BigModal } from '../Modal/BigModal';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useAssignGroupToChurch } from '../../api/refs/useAssignGroupToChurch';
import { useAssignGroupTeacher } from '../../api/refs/useAssignGroupTeacherю';
import { useCreateEntity } from '../../api/entity/useCreateEntity';
import { useTranslation } from 'react-i18next';
import { useEditEntity } from '../../api/entity/useEditEntity';

const initialValues = {
    title: '',
    description: '',
    church: '',
    teachers: [],
    students: [],
};

export const EditGroupModal = ({ churchId, onEdit, group, churchTeachersList, forceUpdate }) => {
    const { t } = useTranslation('tr');
    const [ isFormShown, setIsFormShown ] = useState(false);
    const dispatch = useDispatch();

    const { addGroupToChurch } = useAssignGroupToChurch();
    const { addTeacherToGroup } = useAssignGroupTeacher();
    const { createEntity } = useCreateEntity('group');
    const { editEntity } = useEditEntity('group');
    const { reset, control, getValues, setValue } = useForm({
        defaultValues: {
            ...initialValues,
            church: churchId,
        },
        caches: false,
        mode: 'onChange',
    });

    useEffect(() => {
        if (group) {
            reset({
                title: group.title || '',
                description: group.description || '',
                church: group.church || churchId,
                teachers: group.teachers || [],
                students: group.students || [],
                ...group,
            });
        }
    }, [group, reset, churchId]);

    const handleChangeTeachersList = useCallback(
        async (data) => {
            setValue('teachers', data.value);
        },
        [ setValue ]
    );

    async function createNewGroup (data) {
        const createdGroupId = await createEntity(data);
        await addGroupToChurch(churchId, createdGroupId);

        const teacherPromises = data.teachers.map((teacherId) => {
            return addTeacherToGroup(createdGroupId, teacherId);
        });

        await Promise.all(teacherPromises);
    }
    async function editCurrentGroup (data) {
        await editEntity(data);

        const teacherPromises = getValues().teachers.map((teacherId) => {
            return addTeacherToGroup(data.id, teacherId);
        });

        await Promise.all(teacherPromises);
    }

    const handleAddGroup = useCallback(async () => {
        const data = getValues();

        try {
            if (!data.teachers || !Array.isArray(data.teachers)) {
                throw new Error('Teachers field is missing or not an array');
            }

            !!group
                ? await editCurrentGroup(data)
                : await createNewGroup(data)

            reset();
            onEdit();
            setIsFormShown(false);
            forceUpdate(prev => !prev);
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

    return (
        <BigModal
            size={'small'}
            isOpen={isFormShown}
            setIsOpen={setIsFormShown}
            modalTitle={!!group ? t('group.editGroup') : t('group.addGroup')}
            onCancel={reset}
            icon={group ? <EditIcon /> : (!isFormShown ? <AddIcon/> : <RemoveIcon/>)}
        >
            <ModalContent>
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
                                    {...field}
                                    value={field.value}
                                    placeholder={t('group.placeholder.teachers')}
                                    multiple
                                    search
                                    selection
                                    optionsIds={churchTeachersList}
                                    pointing={'top right'}
                                    onChange={handleChangeTeachersList}
                                />
                            </InputFieldStyled>
                        )}
                    />
                </FormStyled>
            </ModalContent>
            <ModalActions>
                <ButtonStyled
                    className="secondary"
                    onClick={() => setIsFormShown(false)}>
                    {t('button.cancel')}
                </ButtonStyled>
                <ButtonStyled onClick={handleAddGroup}>
                    {!!group ? t('button.edit') : t('button.add')}
                </ButtonStyled>
            </ModalActions>
        </BigModal>
    );
};