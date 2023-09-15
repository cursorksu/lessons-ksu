import React from 'react';
import { Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackButton } from '../../assets/back.svg';
import { GoBackButtonStyled } from './styles';
import { useTranslation } from 'react-i18next';

export const GoBackButton = () => {
  const { t } = useTranslation('translation');
  const navigate = useNavigate();
  return (
    <Tooltip title={t('button.cabinet')}>
      <GoBackButtonStyled onClick={() => navigate(-1)}>
        <BackButton />
      </GoBackButtonStyled>
    </Tooltip>
  );
};
