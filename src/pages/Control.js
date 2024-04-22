import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ReactComponent as TranslateIcon } from '../assets/translate.svg';
import { ReactComponent as GameIcon } from '../assets/game.svg';
import { ReactComponent as CollapseIcon } from '../assets/move.svg';
import { ReactComponent as ChurchIcon } from '../assets/church.svg';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';
import { ReactComponent as GoogleIcon } from '../assets/google.svg';
import { ReactComponent as CollectionsIcon } from '../assets/collection.svg';
import { ReactComponent as ShowIcon } from '../assets/show.svg';
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import { setMainMenuCollapsed } from '../store/mainMenuReducer';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import {routes} from "../router/constants";
import { clsx } from 'clsx';


export const Control = ({ loginWithGoogle, signOut }) => {
  const mainMenuCollapsed  = useSelector(({ mainMenuCollapsed }) => mainMenuCollapsed);
  const auth = useSelector((state) => state.auth);
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
            <MenuItem
              hidden={!auth?.user?.uid}
              icon={<UserIcon />}
              component={
                <Link
                  to={`${routes.cabinet}/${auth?.user?.uid}${routes.group}/${auth?.user?.groups && auth?.user?.groups[0]}`}
                />
              }
              className={clsx({ disabled: !auth?.user?.uid })}
            >
              {t('mainMenu.cabinet')}
            </MenuItem>
            <MenuItem
              icon={<HeartIcon />}
              component={<Link to={`${routes.home}`} />}
              className="big"
            >
              {t('mainMenu.home')}
            </MenuItem>
            <MenuItem
              icon={<ChurchIcon />}
              component={<Link to={routes.church} />}
            >
              {t('mainMenu.community')}
            </MenuItem>
            <MenuItem
              icon={<CollectionsIcon />}
              component={<Link to={`${routes.collections}`} />}
            >
              {t('collections.collections')}
            </MenuItem>
            <MenuItem
              icon={<ShowIcon />}
              component={<Link to={`${routes.scenario}`} />}
              className="middle"
            >
              {t('mainMenu.show')}
            </MenuItem>
            <MenuItem
              hidden={!auth?.user?.uid}
              icon={<GameIcon />}
              component={<Link to={`${routes.games}`} />}
              className={clsx({ middle: true, disabled: !auth?.user?.uid })}
            >
              {t('mainMenu.game')}
            </MenuItem>
            <MenuItem
              hidden={!auth?.user?.uid}
              icon={<UserIcon />}
              component={
                <Link
                  to={`${routes.cabinet}/${auth?.user?.uid}${routes.group}/${auth?.user?.groups && auth?.user?.groups[0]}`}
                />
              }
              className={clsx({ disabled: !auth?.user?.uid })}
            >
              {t('mainMenu.cabinet')}
            </MenuItem>
            {!auth?.token && (
              <MenuItem icon={<GoogleIcon />} onClick={loginWithGoogle}   className="big">
                Sign in
              </MenuItem>
            )}
            {auth?.token && (
              <MenuItem icon={<GoogleIcon />} onClick={signOut}   className="big">
                Sign out
              </MenuItem>
            )}
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
