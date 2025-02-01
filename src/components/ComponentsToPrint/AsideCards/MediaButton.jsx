import {Popup} from 'semantic-ui-react';
import React from 'react';
import {MediaButtonStyled} from './styles';
import {useTranslation} from 'react-i18next';

export const MediaButton = ({ title, icon, onClick, className }) => {
    const {t} = useTranslation('tr');

    return (
            <Popup
                    trigger={(
                          <MediaButtonStyled onClick={onClick} className={className}>
                              {icon}
                          </MediaButtonStyled>
                    )}
                    content={t(title)}
            />
    );
};