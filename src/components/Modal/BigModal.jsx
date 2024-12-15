import { Modal, ModalHeader } from 'semantic-ui-react';
import { ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import React, { useCallback } from 'react';

export const BigModal = ({
                             isOpen,
                             setIsOpen,
                             modalTitle,
                             onCancel,
                             onConfirm,
                             icon,
                             children
                         }) => {

    const handleOpen = useCallback((e) => {
        e.stopPropagation();
        setIsOpen(true);
    }, []);
    const handleClose = useCallback(() => {
        onCancel && onCancel();
        setIsOpen(false);
    }, [ onCancel ]);
    const handleConfirm = useCallback(
        (e) => {
            onConfirm(e);
            setIsOpen(false);
        },
        [ onConfirm ]
    );

    return (
        <Modal
            onClose={onCancel}
            onOpen={handleOpen}
            trigger={
                <ButtonIconStyled onClick={handleOpen} className={'trigger-button'}>
                    {icon}
                </ButtonIconStyled>
            }
            size="big"
            open={isOpen}
        >
            <ModalHeader className="title">
                <h2>{modalTitle}</h2>
                <ButtonIconStyled onClick={handleClose}>
                    <CloseIcon/>
                </ButtonIconStyled>
            </ModalHeader>
            {children}
        </Modal>
    );
};