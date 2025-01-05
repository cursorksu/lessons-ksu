import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import { MessageContent, MessageHeader } from 'semantic-ui-react';
import React from 'react';

export const InviteSuccessMessage = () => (
    <Message size={'small'} positive>
        <MessageHeader>
            Ви успішно авторизувалися!
        </MessageHeader>
        <br/>
        <MessageContent>
            <p>
                Це запрошення було використано для авторизації і втратило свою актуальність. Воно буде видалене протягом
                30 днів.
            </p>
            <p>
                Якщо ви не використовували це запрошення для отримання доступу на цьому сайті, звяжіться з людиною яка
                надіслала вам запрошення і попросіть нове посилання.
            </p>
        </MessageContent>
    </Message>
);