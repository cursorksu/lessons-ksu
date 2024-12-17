import { Modal, ModalHeader } from 'semantic-ui-react';
import { ButtonIconMiniStyled, ButtonIconStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import React, { useCallback } from 'react';

export const BigModal = ({
                             isOpen,
                             setIsOpen,
                             modalTitle,
                             onCancel,
                             icon,
                             size = 'big',
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

    return (
        <Modal
            className={'ksu-modal'}
            onClose={onCancel}
            onOpen={handleOpen}
            trigger={
                <ButtonIconMiniStyled onClick={handleOpen} className={'trigger-button'}>
                    {icon}
                </ButtonIconMiniStyled>
            }
            size={size}
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