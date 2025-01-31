import {KsuCard} from '../../KsuCard';
import {KsuStatus} from '../../KsuStatus/KsuStatus';
import {Popup} from 'semantic-ui-react';
import {ButtonIconMiniStyled} from '../../ButtonStyled';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {ReactComponent as PrintIcon} from '../../../assets/print.svg';
import {ReactComponent as EditIcon} from '../../../assets/edit.svg';
import {useDeleteLesson} from '../../../api/lesson';
import {useLessonToCollection} from '../../../api/collections/useLessonToCollection';
import {useNavigate, useParams} from 'react-router';
import {BigModal} from '../../Modal/BigModal';
import {CreateEntityForm} from '../../CreateEntityForm/CreateEntityForm';
import {lessonConfig, lessonDefaultValues} from '../../../constants/entities/lessonConfig';
import {useTranslation} from 'react-i18next';
import {DeleteConfirmationModal} from '../../Modal/DeleteConfirmationModal';

export const AdminPanel = ({onEdit, lesson, onPrint}) => {
    const {t} = useTranslation('tr');
    const {collectionId} = useParams();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.auth);
    const {deleteLesson} = useDeleteLesson();
    const {unbindLessonFromCollection} = useLessonToCollection();
    const [selectedStatus, setSelectedStatus] = useState(lesson?.status);
    const [createFormIsOpen, setCreateFormIsOpen] = useState(false);

    useEffect(() => {
        setSelectedStatus(lesson?.status);
    }, [lesson]);

    const handleDelete = useCallback(async (e, lessonId) => {
        e.stopPropagation();

        await unbindLessonFromCollection(collectionId, lessonId);
        await deleteLesson(lessonId);
        navigate('/collections/' + collectionId + '/lessons');
    }, [collectionId, deleteLesson, unbindLessonFromCollection]);

    useEffect(() => {
        setSelectedStatus(lesson?.status);
    }, [lesson]);

    return user?.uid && lesson?.createdBy?.uid === user?.uid ? (<KsuCard className={'admin-panel print-hide'}>
        <div>
            <span>Status: </span>
            <KsuStatus
                    status={selectedStatus}
                    entityName={'lessons'}
                    className={'action-button'}
                    entityId={lesson?.id}
                    onStatusChange={(data) => setSelectedStatus(data)}
            />
        </div>
        <div>
            <Popup
                    trigger={<ButtonIconMiniStyled onClick={onPrint}>
                        <PrintIcon/>
                    </ButtonIconMiniStyled>}
                    content="Надрукувати цей урок"
            />
            <Popup
                    trigger={
                        <BigModal
                                icon={<EditIcon/>}
                                isOpen={createFormIsOpen}
                                onCancel={() => {
                                }}
                                setIsOpen={setCreateFormIsOpen}
                                modalTitle={t('button.createLesson')}
                                onConfirm={() => {
                                }}
                        >
                            <CreateEntityForm
                                    entityName="lessons"
                                    onConfirm={onEdit}
                                    onClose={() => setCreateFormIsOpen(false)}
                                    fields={lessonConfig}
                                    defaultValues={lessonDefaultValues}
                            />
                        </BigModal>
                    }
                    content="Змінити назву та заобаження уроку"
            />
            <Popup
                    trigger={
                        <DeleteConfirmationModal
                                modalTitle={`${t('modal.title.lessonDelete')}`}
                                modalContent={`${t('modal.lessonDelete')}`}
                                onConfirm={(e) => handleDelete(e, lesson?.id)}
                                size={'small'}
                        />
                    }
                    content={t('modal.title.lessonDelete')}
            />
        </div>
    </KsuCard>) : null;
};