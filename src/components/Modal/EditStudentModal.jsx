import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { ReactComponent as EditIcon } from '../../assets/edit.svg';
import { ReactComponent as CreateIcon } from '../../assets/add.svg';
import { CreateEntityForm } from '../CreateEntityForm/CreateEntityForm';
import { studentConfig } from '../../constants/entities/studentConfig';
import React, { useState } from 'react';
import { Modal, ModalHeader, Popup } from 'semantic-ui-react';
import { ButtonIconMiniStyled } from '../ButtonStyled';
import { useTranslation } from 'react-i18next';

export const EditStudentModal = ({
    student,
    onConfirm
}) => {
    const { t } = useTranslation('tr');
    const [isOpen, setIsOpen] = useState(false);
    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };
    
    return (<>
        
        <Modal
                className={'ksu-modal'}
                onClose={handleClose}
                trigger={<Popup
                        content={!student.id ? t('students.addStudent') : t('students.editStudent')}
                        trigger={(<ButtonIconMiniStyled onClick={handleOpen}>
                            {student.id ? <EditIcon/> : <CreateIcon/>}
                        </ButtonIconMiniStyled>)}
                        basic
                />}
                size={'large'}
                open={isOpen}
        >
            <ModalHeader className="title">
                <h2>{!student.id ? t('students.addStudent') : t('students.editStudent')}</h2>
                <ButtonIconMiniStyled onClick={handleClose}>
                    <CloseIcon/>
                </ButtonIconMiniStyled>
            </ModalHeader>
            <CreateEntityForm
                    className="sticky"
                    entityName="students"
                    onConfirm={() => {
                        onConfirm();
                        handleClose();
                    }}
                    onClose={handleClose}
                    fields={studentConfig}
                    defaultValues={student}
            />
        </Modal>
    </>);
};