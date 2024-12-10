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
        <div className="card-img-wrapper" ref={wrapperRef}>
          {imagesLoaded && <img src={item?.imageUrl} alt={item?.title} />}
          {!imagesLoaded && <ImageIcon />}
        </div>
        <CardContent>
          <p className="description">{item?.goal}</p>
          <h2 className="title card-title">{item?.title}</h2>
          <p className="quote">{item?.bibleText}</p>
          <div className="quote">
            <b>{item?.bibleQuote}</b>
          </div>
        </CardContent>
        <CardMeta>
          <div>
            <p>Created: {item?.createdAt}</p>
            <p>
              Author: {item?.createdBy?.firstName} {item?.createdBy?.lastName}
            </p>
          </div>
          <ButtonIconStyled onClick={(e) => onDelete(e, item?.id)}>
            <DeleteIcon />
          </ButtonIconStyled>
        </CardMeta>
      </LessonCardStyled>
    </Card>
  );
};
