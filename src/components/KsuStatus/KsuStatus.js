import { KsuStatusStyled, StatusListStyled } from './KsuStatusStyled';
import { clsx } from 'clsx';
import { publicStatuses } from '../../constants/statuses/publicStatuses';
import { useTranslation } from 'react-i18next';
import { Popup } from 'semantic-ui-react';
import React from 'react';

export const KsuStatus = ({ status, onStatusChange }) => {
  const { t } = useTranslation('tr');
  // TODO: не давать править урок в статусе ожидания аппрува или давать
  //  править тольк уроки в статусе драфт!!!

  const publicList = [
    {id: 4, text: 'status.labels.draft', description: 'status.draft'},
  ];
  const activeList = [
    {id: 1, text: 'status.labels.published', description: 'status.published'},
    {id: 4, text: 'status.labels.draft', description: 'status.draft'},
  ];
  const draftList = [
    {id: 1, text: 'status.labels.published', description: 'status.published'},
    {id: 3, text: 'status.labels.active', description: 'status.active'},
  ];

  return  status !== publicStatuses.waiting
    ? (
      <Popup
        className="popup-menu"
        closeOnDocumentClick
        closeOnPortalMouseLeave
        trigger={(
          <KsuStatusStyled
            className={clsx({
              public: status === publicStatuses.published,
              waiting: status === publicStatuses.waiting,
              active: status === publicStatuses.active,
              draft: status === publicStatuses.draft,
            })}>
            {status === publicStatuses.published && t('status.labels.published')}
            {status === publicStatuses.waiting && t('status.labels.waiting')}
            {status === publicStatuses.active && t('status.labels.active')}
            {status === publicStatuses.draft && t('status.labels.draft')}
          </KsuStatusStyled>
        )}
        content={(
          <StatusListStyled>
            {status === publicStatuses.draft && draftList.map(el => (
              <li key={el.text} onClick={() => onStatusChange(el.id)}>
                <div className='title'>{t(el.text)}</div>
                <div className='description'>{t(el.description)}</div>
              </li>
            ))}

            {status === publicStatuses.active && activeList.map(el => (
              <li key={el.text} onClick={() => onStatusChange(el.id)}>
                <div className='title'>{t(el.text)}</div>
                <div className='description'>{t(el.description)}</div>
              </li>
            ))}

            {status === publicStatuses.published && publicList.map(el => (
              <li key={el.text} onClick={() => onStatusChange(el.id)}>
                <div className='title'>{t(el.text)}</div>
                <div className='description'>{t(el.description)}</div>
              </li>
            ))}
          </StatusListStyled>
        )}
      />
    )
    : (
      <KsuStatusStyled
        className={clsx({
          waiting: status === publicStatuses.waiting,
        })}>
        {status === publicStatuses.waiting && t('status.labels.waiting')}
      </KsuStatusStyled>
    );
};
