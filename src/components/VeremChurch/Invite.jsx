import { ButtonIconMiniStyled } from '../ButtonStyled';
import { InviteStyled } from './style';
import React, { useCallback } from 'react';
import { ReactComponent as TelegramIcon } from '../../assets/telegram.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import { ReactComponent as EmailIcon } from '../../assets/email.svg';
import { ReactComponent as WatsUpIcon } from '../../assets/comment.svg';
import { setMessage } from '../../store/notificationReducer';
import { useDispatch } from 'react-redux';
import { useInvite } from '../../api/invite/createInvite';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';

export const Invite = ({ church }) => {
    const { t } = useTranslation('tr');
    const dispatch = useDispatch();
    const { createInvite } = useInvite();
    const onCopyUrl = useCallback(async () => {
        const url = await createInvite(church?.id);
        try {
            await navigator.clipboard.writeText(url);
            dispatch(setMessage({
                type: 'success',
                message: {
                    title: t('Посилання успішно скопійоване'),
                    description: `${url} відправте це посилання поштою або зручним вам меседжером`,
                },
            }));
        } catch (error) {
            dispatch(setMessage({
                type: 'success',
                message: {
                    title: t('Посилання не було створене'),
                    description: `Перевірте інтернет з'єднання або спробуйте пізніше. ${error.message}`,
                },
            }));
        }
    }, [church]);
    return (<InviteStyled>
                <p>{t('church.invite')}</p>
                <div className="invite-panel">
                    <span>Запросити друзів</span>
                    <div>
                        <Popup
                                basic
                                content={'Копіювати посилання'}
                                trigger={<ButtonIconMiniStyled onClick={onCopyUrl}><LinkIcon/></ButtonIconMiniStyled>}
                        />
                        <Popup
                                basic
                                content={'Відправити імейл'}
                                trigger={<ButtonIconMiniStyled onClick={onCopyUrl}><EmailIcon/></ButtonIconMiniStyled>}
                        />
                        <Popup
                                basic
                                content={'Запросити через Tелеграм'}
                                trigger={<ButtonIconMiniStyled
                                        onClick={onCopyUrl}><TelegramIcon/></ButtonIconMiniStyled>}
                        />
                        <Popup
                                basic
                                content={'Запросити через Watsapp'}
                                trigger={<ButtonIconMiniStyled onClick={onCopyUrl}><WatsUpIcon/></ButtonIconMiniStyled>}
                        />
                    </div>
                </div>
            </InviteStyled>);
};