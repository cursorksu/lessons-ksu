import Message from 'semantic-ui-react/dist/commonjs/collections/Message';
import React  from 'react';
import { MessageHeader, MessageContent } from 'semantic-ui-react';

export const InviteFailedMessage = () => (
    <Message size={'small'} negative>
        <MessageHeader>
            Помилка! Це запрошення більше не дійсне
        </MessageHeader>
        <br/>
        <MessageContent>
            <p>
               З метою покращення безпекових якостей додатку запрошення залишається дійсним лише 7 днів.
            </p>
            <p>
                Будь ласка зверніться до тієї людини,
                яка вас запросила для того щоб отримати нове запрошення або зареєструйтеся за допомогою Google.
                Після цього адміністратор вашої церкви у нашому додатку зможе додати вас самостійно.
            </p>
        </MessageContent>
    </Message>
);
