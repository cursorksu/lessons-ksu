import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ButtonIconStyled } from '../ButtonStyled';

import { LessonCardStyled } from './style';

export const LessonCard = ({ item, onClick, onDelete }) => (
  <LessonCardStyled variant="outlined" onClick={() => onClick(item?.id)}>
    <ButtonIconStyled onClick={(e) => onDelete(e, item?.id)}>
      <DeleteIcon />
    </ButtonIconStyled>

    <div className='top-block'>
      <div className='img-wrapper'>
        <div className='overflow'>
          <img src={item?.img} alt={item?.title} />
        </div>
      </div>
      <div>
        <p className="description">{item?.goal}</p>
      </div>
    </div>
    <div className='content-wrapper'>
      <h2 className='title'>{item?.title}</h2>
      <p>{item?.bible}</p>
      <p>{item?.quote}</p>
    </div>
  </LessonCardStyled>
);
