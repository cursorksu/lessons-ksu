import {KsuCard} from '../../KsuCard';
import {KsuStatus} from '../../KsuStatus/KsuStatus';
import {Dropdown, Popup} from 'semantic-ui-react';
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
import {TitleSmall} from '../../TitleStyled';
import {StyledDropdown} from '../../KsuDropdown/StyledDropdown';
import {useLessonToGroup} from '../../../api/lesson/useLessonToGroup';
import {LabelStyled} from '../../InputStyled';

export const AdminPanel = ({onEdit, lesson, onPrint}) => {
    const {t} = useTranslation('tr');
    const { lessonId } = useParams();
    const { bindLessonToGroup } = useLessonToGroup();
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

    return user?.uid && lesson?.createdBy?.uid === user?.uid ? (
            <KsuCard className={'admin-panel print-hide'}>
                <div>
                    <TitleSmall>Status:
                        <KsuStatus
                                status={selectedStatus}
                                entityName={'lessons'}
                                className={'action-button'}
                                entityId={lesson?.id}
                                onStatusChange={(data) => setSelectedStatus(data)}
                        />
                    </TitleSmall>
                </div>
                <>
                    <LabelStyled>Assign Lesson to group:</LabelStyled>
                    <StyledDropdown>
                        <Dropdown
                                fluid
                                multiple={false}
                                placeholder={'group.labels.type'}
                                options={user?.groups?.map(el => ({key: el, text: el, value: el}))}
                                onChange={(_, data) => bindLessonToGroup(data.value, lessonId)}
                        />
                    </StyledDropdown>
                </>
                <div className={'action-buttons'}>
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
                                        modalTitle={t('button.editLesson')}
                                        onConfirm={() => {
                                        }}
                                >
                                    <CreateEntityForm
                                            entityName="lessons"
                                            onConfirm={onEdit}
                                            onClose={() => setCreateFormIsOpen(false)}
                                            fields={lessonConfig}
                                            defaultValues={lesson || lessonDefaultValues}
                                    />
                                </BigModal>
                            }
                            content="Змінити назву та заобаження уроку"
                    />

                    <DeleteConfirmationModal
                            modalTitle={`${t('modal.title.lessonDelete')}`}
                            modalContent={`${t('modal.lessonDelete')}`}
                            onConfirm={(e) => handleDelete(e, lesson?.id)}
                            size={'small'}
                    />
                </div>
            </KsuCard>
    ) : (
            <Popup
                    trigger={<ButtonIconMiniStyled onClick={onPrint}>
                        <PrintIcon/>
                    </ButtonIconMiniStyled>}
                    content="Надрукувати цей урок"
            />
    );
};