import { Popup } from 'semantic-ui-react';
import { ButtonIconBasisStyled } from '../../ButtonStyled';
import React, { useEffect, useState } from 'react';
import { ReactComponent as AddIcon } from '../../../assets/add.svg';
import { ReactComponent as AddImageIcon } from '../../../assets/addImage.svg';
import { ReactComponent as AddListIcon } from '../../../assets/addList.svg';
import { ReactComponent as AddMediaIcon } from '../../../assets/addMedia.svg';
import { ReactComponent as AddDevIcon } from '../../../assets/addDevider.svg';
import { ReactComponent as AddQuoteIcon } from '../../../assets/addQuote.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/delete.svg';
import { ReactComponent as CalendarIcon } from '../../../assets/calendar.svg';
import { ReactComponent as TitleIcon } from '../../../assets/title.svg';
import { ReactComponent as LinkIcon } from '../../../assets/link.svg';
import { ReactComponent as SubtitleIcon } from '../../../assets/subtitle.svg';

const modeSettings = {
  craft: [200, 700, 900, 1000],
  food: [200, 700, 900, 1000],
  game: [200, 700, 900, 1000],
  subject: [200, 700, 900, 1000],
  memory: [200, 700, 900, 1000],
};

const buttonList = [
  {id: 100, icon: <TitleIcon />, tooltip: 'Додати заголовок', type: 'title'},
  {id: 200, icon: <SubtitleIcon />, tooltip: 'Додати підзаголовок', type: 'subtitle'},
  {id: 300, icon: <AddIcon />, tooltip: 'Додати абзац тексту', type: 'paragraph'},
  {id: 400, icon: <AddListIcon />, tooltip: 'Додати список', type: 'list'},
  {id: 500, icon: <CalendarIcon />, tooltip: 'Додати дату', type: 'date'},
  {id: 600, icon: <AddQuoteIcon />, tooltip: 'Додати список визначеннь', type: 'dict'},
  {id: 700, icon: <AddDevIcon />, tooltip: 'Додати розділювач', type: 'dev'},
  {id: 800, icon: <LinkIcon />, tooltip: 'Додати посилання', type: 'link'},
  {id: 900, icon: <AddImageIcon />, tooltip: 'Додати зображення', type: 'image'},
  {id: 1000, icon: <AddMediaIcon />, tooltip: 'Додати відео', type: 'media'},
];
export const HandleBar = (({
  mode,
  addEntity,
  clearRenderList
}) => {
  const [modeButtonList, setModeButtonList] = useState(buttonList);
  useEffect(() => {
    if (mode === 'topic') return;
    setModeButtonList(
      buttonList.filter((el) => modeSettings[mode] && modeSettings[mode].includes(el?.id))
    );
  }, [mode]);

  return (
    <div className="btn-wrapper">
      {modeButtonList.map(({id, icon, tooltip, type}) => (
        <Popup
          key={id}
          trigger={(
            <ButtonIconBasisStyled onClick={() => addEntity(type)}>
              {icon}
            </ButtonIconBasisStyled>
          )}
          content={tooltip}
        />
      ))}

      <Popup
        trigger={(
          <ButtonIconBasisStyled onClick={clearRenderList}>
            <DeleteIcon />
          </ButtonIconBasisStyled>
        )}
        content='Скинути всі зміни'
      />
    </div>
  );
});
