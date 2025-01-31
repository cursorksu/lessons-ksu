import { BottomNavigationStyled, DonationStyled, FooterStyles } from './styles';
import { ButtonIconMiniStyled, ButtonStyled } from '../ButtonStyled';
import { InputFieldStyled, InputStyled, LabelStyled } from '../InputStyled';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../router/constants';
import { ReactComponent as TelegramIcon } from '../../assets/telegram.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
import { ReactComponent as EmailIcon } from '../../assets/email.svg';
import { ReactComponent as WatsUpIcon } from '../../assets/comment.svg';
import { Popup } from 'semantic-ui-react';

export const Footer = () => {
    const [amount, setAmount] = useState(500);
    const [isDonation, setIsDonation] = useState(true);
    
    return (<FooterStyles>
        <div></div>
        <DonationStyled>
            <p>
                Ми розвиваємо цей проект з власної ініціативи і несемо всі видатки.
                Якщо ви знаходите його корисним, підтримайте нашу роботу!
            </p>
            <div className="donation-buttons">
                <ButtonStyled
                        onClick={() => setAmount(200)}
                        className={amount === 200 && 'active'}>
                    2$
                </ButtonStyled>
                <ButtonStyled
                        onClick={() => setAmount(500)}
                        className={amount === 500 && 'active'}>
                    5$
                </ButtonStyled>
                <ButtonStyled
                        onClick={() => setAmount(100)}
                        className={amount === 100 && 'active'}>
                    10$
                </ButtonStyled>
            </div>
            <InputFieldStyled>
                <LabelStyled>Інша сума</LabelStyled>
                <InputStyled
                        value={amount / 100}
                        onChange={(e) => setAmount(e.target.value * 100)}
                        type={'number'}
                        placeholder={'Type here..'}
                />
            </InputFieldStyled>
            <div className="donation-buttons">
                <InputFieldStyled>
                    <LabelStyled>Щомісячно</LabelStyled>
                    <ButtonStyled
                            onClick={() => setIsDonation(true)}
                            className={isDonation && 'active'}>
                        Підпісатися
                    </ButtonStyled>
                </InputFieldStyled>
                <InputFieldStyled>
                    <LabelStyled>Разово</LabelStyled>
                    <ButtonStyled
                            onClick={() => setIsDonation(false)}
                            className={!isDonation && 'active'}>
                        Підтримати
                    </ButtonStyled>
                </InputFieldStyled>
            </div>
        </DonationStyled>
        <BottomNavigationStyled>
            <ul>
                <li><NavLink to={routes.church}>Churches</NavLink></li>
                <li><NavLink to={routes.lessons}>Lessons</NavLink></li>
                <li><NavLink to={routes.scenario}>Scenarios</NavLink></li>
                <li><NavLink to={routes.blog}>Blog</NavLink></li>
                <li><NavLink to={routes.cabinet}>User Cabinet</NavLink></li>
            </ul>
            <div className="network-buttons">
                <div></div>
                <Popup
                        basic
                        content={'Відправити імейл'}
                        trigger={<ButtonIconMiniStyled><EmailIcon/></ButtonIconMiniStyled>}
                />
                <Popup
                        basic
                        content={'Запросити через Tелеграм'}
                        trigger={<ButtonIconMiniStyled><TelegramIcon/></ButtonIconMiniStyled>}
                />
                <Popup
                        basic
                        content={'Запросити через Watsapp'}
                        trigger={<ButtonIconMiniStyled><WatsUpIcon/></ButtonIconMiniStyled>}
                />
            </div>
        </BottomNavigationStyled>
    </FooterStyles>
);
};