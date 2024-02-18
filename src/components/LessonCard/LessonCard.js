import React, { useRef } from 'react';
import { ReactComponent as ImageIcon } from '../../assets/image.svg';
import { ReactComponent as DeleteIcon } from '../../assets/delete.svg';
import { ButtonIconStyled } from '../ButtonStyled';

import { LessonCardStyled } from './style';
import { Card, CardContent, CardMeta } from 'semantic-ui-react';
import { useOnLoadImages } from '../../hooks/useOnLoadImages';

export const LessonCard = ({ item, onClick, onDelete }) => {
  const wrapperRef = useRef(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  return (
    <Card>
      <LessonCardStyled onClick={() => onClick(item?.id)}>
        <div className='card-img-wrapper' ref={wrapperRef}>
          {imagesLoaded && <img src={item?.img} alt={item?.title} />}
          {!imagesLoaded && <ImageIcon />}
        </div>
        <CardContent>
          <p className="description">{item?.goal}</p>
          <h2 className='title card-title'>{item?.title}</h2>
          <p className="quote">{item?.bible}</p>
        </CardContent>
        <CardMeta>
          <div>
            <p>{item?.quote}</p>
            <p>Created: {item && new Date(item?.createdAt).toLocaleDateString().toString()}</p>
          </div>
          <ButtonIconStyled onClick={(e) => onDelete(e, item?.id)}>
            <DeleteIcon />
          </ButtonIconStyled>
        </CardMeta>
      </LessonCardStyled>
    </Card>
  );
};
