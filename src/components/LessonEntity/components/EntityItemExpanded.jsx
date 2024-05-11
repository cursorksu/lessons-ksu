import { EntityItemStyled } from '../EntityItemStyled';
import { getDateFromTimeStep } from '../../../utils/getDateFromTimeStep';
import { HTMLRenderer } from '../../HTMLRender/HTMLRender';
import React, { useState } from 'react';
import { clsx } from 'clsx';

export const EntityItemExpanded = ({entityName, item}) => {
  const [isContentShown, setIsContentShown] = useState(false);
  const findFirstImage = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const imgElement = doc.querySelector('img');
    if (imgElement) {
      return imgElement.outerHTML; // Возвращает HTML-код первого изображения
    } else {
      return null; // Возвращаем null, если изображение не найдено
    }
  };

  return (
    <EntityItemStyled
      className={clsx({
        entityName,
        expanded: isContentShown,
      })}
      role="button"
      onClick={() => setIsContentShown(prev => !prev)}
    >
      <div className="item-content">
        <div className="image">
          <HTMLRenderer htmlContent={findFirstImage(item.text)} />
        </div>
        <div className="item-title">
          <h1>{item.title || <span className='light'>No title</span>}</h1>
          <div>
            <div><b>Автор: </b>{item.createdBy.name}</div>
            <div><b>Створено: </b>{getDateFromTimeStep(item.createdAt)}</div>
            <div><b>Кількість використань: </b>{item?.lessons?.length || 0}</div>
          </div>
        </div>
      </div>
      {isContentShown && (
        <div className="text">
          <HTMLRenderer htmlContent={item.text} />
        </div>
      )}
    </EntityItemStyled>
  );
};
