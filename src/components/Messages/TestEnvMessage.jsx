import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import React, { useState } from 'react';
import { MessageHeader, MessageContent } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonIconMiniStyled } from '../ButtonStyled';
import { ReactComponent as CloseIcon } from '../../assets/close.svg';
import { setTestEnvMessageClose } from '../../store/testEnvMessageReducer';

export const TestEnvMessage = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(store => store.testEnvMessage);
    const onClose = () => dispatch(setTestEnvMessageClose(false));


    return (
        <>
            {isOpen
             ? (
                 <Message size={'small'} style={{ margin: 0 }} negative>
                     <MessageHeader>
                         Увага! Ви працюєте з сайтом який знаходитсья у розробці!
                         <ButtonIconMiniStyled onClick={onClose} className="close">
                             <CloseIcon/>
                         </ButtonIconMiniStyled>
                     </MessageHeader>
                     <br/>
                     <MessageContent>
                         <p>
                             Деякі функції можуть не працювати або відпрацьовувати не так як очікується! Якщо ви виявите несподівану поведінку або некорректний вид сторінки, будь-ласка не залишайте сайт! Ви дуже посприяєте розробці якщо зробите скріншот і повідомите розробникам про проблему!
                         </p>
                         <p>
                             Дякуємо за розуміння, терпіння і допомогу!
                         </p>
                     </MessageContent>
                 </Message>
             ) : (
                 <></>
             )}
        </>

    );
};
