import { Tooltip } from '@mui/material';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import React from 'react';
import { ReactComponent as AddIcon } from '../../../assets/add.svg';
import { ReactComponent as AddImageIcon } from '../../../assets/addImage.svg';
import { ReactComponent as AddListIcon } from '../../../assets/addList.svg';
import { ReactComponent as AddMediaIcon } from '../../../assets/addMedia.svg';
import { ReactComponent as AddDevIcon } from '../../../assets/addDevider.svg';
import { ReactComponent as AddQuoteIcon } from '../../../assets/addQuote.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/calendar.svg';
import { ReactComponent as TitleIcon } from '../../../assets/title.svg';
import { ReactComponent as CodeIcon } from '../../../assets/code.svg';
import { ReactComponent as LinkIcon } from '../../../assets/link.svg';
import { ReactComponent as SubtitleIcon } from '../../../assets/subtitle.svg';

export const HandleBar = React.forwardRef(({ addEntity, clearRenderList }) => {
  return (
    <div className="btn-wrapper">
      <Tooltip title="Додати заголовок">
        <ButtonIconBasisStyled onClick={() => addEntity('title')}>
          <TitleIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати підзаголовок">
        <ButtonIconBasisStyled onClick={() => addEntity('subtitle')}>
          <SubtitleIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати абзац тексту">
        <ButtonIconBasisStyled onClick={() => addEntity('paragraph')}>
          <AddIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати список">
        <ButtonIconBasisStyled onClick={() => addEntity('list')}>
          <AddListIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати дату">
        <ButtonIconBasisStyled onClick={() => addEntity('date')}>
          <CalendarIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати список визначеннь">
        <ButtonIconBasisStyled onClick={() => addEntity('dict')}>
          <AddQuoteIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати розділювач">
        <ButtonIconBasisStyled onClick={() => addEntity('dev')}>
          <AddDevIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати посилання">
        <ButtonIconBasisStyled onClick={() => addEntity('link')}>
          <LinkIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати html">
        <ButtonIconBasisStyled onClick={() => addEntity('code')}>
          <CodeIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати зображення">
        <ButtonIconBasisStyled onClick={() => addEntity('image')}>
          <AddImageIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Додати відео">
        <ButtonIconBasisStyled onClick={() => addEntity('media')}>
          <AddMediaIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
      <Tooltip title="Скинути всі зміни">
        <ButtonIconBasisStyled onClick={clearRenderList}>
          <DeleteIcon />
        </ButtonIconBasisStyled>
      </Tooltip>
    </div>
  );
});
