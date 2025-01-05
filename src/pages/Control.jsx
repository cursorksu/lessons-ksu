import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ReactComponent as TranslateIcon } from '../assets/translate.svg';
import { ReactComponent as CollapseIcon } from '../assets/move.svg';
import { ReactComponent as ChurchIcon } from '../assets/church.svg';
import { ReactComponent as UserIcon } from '../assets/user.svg';
import { ReactComponent as BackIcon } from '../assets/back.svg';
import { ReactComponent as GoogleIcon } from '../assets/google.svg';
import { ReactComponent as CollectionsIcon } from '../assets/collection.svg';
import { ReactComponent as ShowIcon } from '../assets/show.svg';
import { ReactComponent as HeartIcon } from '../assets/heart.svg';
import { ReactComponent as PalletIcon } from '../assets/pallete.svg';
import { ReactComponent as TopicIcon } from '../assets/topic.svg';
import { ReactComponent as NormalGameIcon } from '../assets/game.svg';
import { ReactComponent as FoodIcon } from '../assets/food.svg';
import { ReactComponent as MemoryIcon } from '../assets/memory.svg';
import { ReactComponent as BookmarkIcon } from '../assets/bookmark.svg';
import { setMainMenuCollapsed } from '../store/mainMenuReducer';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Divider } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { routes } from '../router/constants';
import { clsx } from 'clsx';
export const Control = ({ loginWithGoogle, signOut }) => {
  const mainMenuCollapsed = useSelector(
    ({ mainMenuCollapsed }) => mainMenuCollapsed
  );
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('tr');
  const handleCollapse = () => {
    dispatch(setMainMenuCollapsed(!mainMenuCollapsed));
  };

  const currentLang = i18n.language;

  return (
    <div className="collapsed-menu">
      <Sidebar collapsed={mainMenuCollapsed}>
        <Menu>
          <div>
            <MenuItem
              icon={<CollapseIcon />}
              className={clsx({ active: !mainMenuCollapsed })}
              onClick={handleCollapse}>
              {t('mainMenu.collapse')}
            </MenuItem>
            <SubMenu label={t('mainMenu.lang')} icon={<TranslateIcon />}>
              <MenuItem
                className={clsx({ active: currentLang === 'ua' })}
                onClick={() => i18n.changeLanguage('ua')}>
                {t('mainMenu.ua')}
              </MenuItem>
              <MenuItem
                className={clsx({ active: currentLang === 'en' })}
                onClick={() => i18n.changeLanguage('en')}>
                {t('mainMenu.en')}
              </MenuItem>
              <MenuItem
                className={clsx({ active: currentLang === 'ru' })}
                onClick={() => i18n.changeLanguage('ru')}>
                {t('mainMenu.ru')}
              </MenuItem>
            </SubMenu>
            <MenuItem
              hidden={!auth?.user?.uid}
              icon={<UserIcon />}
              component={
                <Link
                  to={`${routes.cabinet}/${auth?.user?.uid}${routes.group}/${
                    auth?.user?.groups && auth?.user?.groups[0]
                  }`}
                />
              }
              className={clsx({
                disabled: !auth?.user?.uid,
                active: pathname.includes(routes.cabinet),
              })}>
              {t('mainMenu.cabinet')}
            </MenuItem>
            <MenuItem
              icon={<HeartIcon />}
              component={<Link to={`${routes.home}`} />}
              className={clsx({
                big: true,
                active: pathname === '/',
              })}>
              {t('mainMenu.home')}
            </MenuItem>
            <MenuItem
              icon={<ChurchIcon />}
              component={<Link to={routes.church} />}
              className={clsx({
                active: pathname.includes(routes.church),
              })}>
              {t('mainMenu.community')}
            </MenuItem>
            <SubMenu
              label={t('collections.collections')}
              icon={<CollectionsIcon />}>
              <MenuItem
                icon={<TopicIcon />}
                component={<Link to={`${routes.collections}`} />}
                className={clsx({
                  active: pathname.includes(routes.collections),
                })}>
                Список уроков
              </MenuItem>
              <MenuItem
                icon={<BookmarkIcon />}
                component={<Link to={routes.subject} />}
                className={clsx({
                  active: pathname.includes(routes.subject),
                })}>
                Предметний приклад
              </MenuItem>
              <MenuItem
                icon={<NormalGameIcon />}
                component={<Link to={routes.game} />}
                className={clsx({
                  active: pathname.includes(routes.game),
                })}>
                {t('mainMenu.game')}
              </MenuItem>
              <MenuItem
                icon={<PalletIcon />}
                component={<Link to={`${routes.creativity}`} />}
                className={clsx({
                  active: pathname.includes(routes.creativity),
                })}>
                {t('collections.creativity')}
              </MenuItem>
              <MenuItem
                icon={<MemoryIcon />}
                component={<Link to={`${routes.memory}`} />}
                className={clsx({
                  active: pathname.includes(routes.memory),
                })}>
                Запам'ятовування
              </MenuItem>
              <MenuItem
                icon={<FoodIcon />}
                component={<Link to={`${routes.food}`} />}
                className={clsx({
                  active: pathname.includes(routes.food),
                })}>
                Частування
              </MenuItem>
            </SubMenu>
            <MenuItem
              icon={<ShowIcon />}
              component={<Link to={`${routes.scenario}`} />}
              className={clsx({
                middle: true,
                active: pathname.includes(routes.scenario),
              })}>
              {t('mainMenu.show')}
            </MenuItem>
            {!auth?.token && !pathname.includes('invite') && (
              <MenuItem
                icon={<GoogleIcon />}
                onClick={loginWithGoogle}
                className="big">
                Sign in
              </MenuItem>
            )}
            {auth?.token && (
              <MenuItem icon={<GoogleIcon />} onClick={signOut} className="big">
                Sign out
              </MenuItem>
            )}
          </div>
          <div>
            <Divider section />
            <MenuItem icon={<BackIcon />} onClick={() => navigate(-1)}>
              {t('mainMenu.goBack')}
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
    </div>
  );
};
