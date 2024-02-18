import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ReactComponent as TranslateIcon } from '../assets/translate.svg';
import { ReactComponent as SettingsIcon } from '../assets/settings.svg';
import { ReactComponent as CollapseIcon } from '../assets/move.svg';
import { ReactComponent as UsersIcon } from '../assets/users.svg';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';
import { setMainMenuCollapsed } from '../store/mainMenuReducer';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';

export const Control = () => {
  const mainMenuCollapsed  = useSelector(({ mainMenuCollapsed }) => mainMenuCollapsed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('tr');

  const handleCollapse = () => {
    dispatch(setMainMenuCollapsed(!mainMenuCollapsed));
  };

  return (
    <div className="collapsed-menu">
      <Sidebar collapsed={mainMenuCollapsed}>
        <Menu>
          <div>
            <MenuItem icon={<CollapseIcon />} onClick={handleCollapse}>{t('mainMenu.collapse')}</MenuItem>
            <SubMenu label={t('mainMenu.lang')} icon={<TranslateIcon />}>
              <MenuItem onClick={() => i18n.changeLanguage('ua')}>{t('mainMenu.ua')}</MenuItem>
              <MenuItem onClick={() => i18n.changeLanguage('en')}>{t('mainMenu.en')}</MenuItem>
              <MenuItem onClick={() => i18n.changeLanguage('ru')}>{t('mainMenu.ru')}</MenuItem>
            </SubMenu>
            <MenuItem icon={<SettingsIcon />}>{t('mainMenu.settings')}</MenuItem>
            <MenuItem icon={<UsersIcon />}>{t('mainMenu.community')}</MenuItem>
            <MenuItem icon={<UserIcon />}>{t('mainMenu.cabinet')}</MenuItem>
          </div>
          <div>
            <Divider section />
            <MenuItem icon={<BackIcon />} onClick={() => navigate(-1)}>{t('mainMenu.goBack')}</MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};
