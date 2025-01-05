import React, { useEffect, useMemo, useState } from 'react';
import { useGetEntity } from '../../api/entity/useGetEntity';
import { ChurchItemStyled } from './style';
import { USER_AVATAR_PLACEHOLDER } from '../../constants/main';
import { DeleteConfirmationModal } from '../Modal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

export const TeacherItem = ({ entityName, id, removeEntity, isAuth }) => {
    const { getUserById } = useGetEntity(entityName);
    const [ entityData, setEntityData ] = useState(null);
    const { t } = useTranslation('tr');

    useEffect(() => {
        getUserById(id).then((data) => {
            setEntityData(data);
        });
    }, [ id, getUserById ]);

    const isRealAvatar = useMemo(() => USER_AVATAR_PLACEHOLDER === entityData?.avatar, [ entityData ]);

    return (
        <ChurchItemStyled key={entityData?.id}>
            <div
                className={clsx({ 'd-flex-between': isAuth, 'd-flex-center': !isAuth })}
                style={{ marginBottom: '20px' }}
            >
                <h3>
                    {entityData?.firstName} {entityData?.lastName}
                </h3>
                {isAuth && (
                    <DeleteConfirmationModal
                        modalTitle={`${t('modal.title.deleteTeacher')} ${entityData?.fullName.toString()}`}
                        modalContent={`${t('modal.teacherDelete')}`}
                        onConfirm={() => removeEntity(entityData?.id)}
                    />
                )}
            </div>
            <img
                className={isRealAvatar && 'avatar-placeholder'}
                src={isRealAvatar ? USER_AVATAR_PLACEHOLDER : entityData?.avatar}
                alt={entityData?.firstName}
            />
            <ul>
                <li>
                    <span>Students: </span> {entityData?.students?.length}
                </li>
                <li>
                    <span>Groups: </span> {entityData?.groups?.length}
                </li>
                <li>
                    <span>Created lessons: </span> {entityData?.lessons?.length}
                </li>
                <li>
                    <span>Created scenarios: </span> {entityData?.scenarios?.length}
                </li>
            </ul>
        </ChurchItemStyled>
    );
};
