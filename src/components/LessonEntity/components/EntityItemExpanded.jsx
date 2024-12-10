import { EntityItemStyled } from '../EntityItemStyled';
import { HTMLRenderer } from '../../HTMLRender/HTMLRender';
import React, { useState } from 'react';
import { clsx } from 'clsx';
import { ReactComponent as LinkIcon } from '../../../assets/link.svg';
import { ReactComponent as PrintIcon } from '../../../assets/print.svg';
import { ReactComponent as EditIcon } from '../../../assets/edit.svg';
import { getDateLocalString } from '../../../utils/getDateLocalString';
import { ButtonIconStyled } from '../../ButtonStyled';
import { useDeleteEntity } from '../../../api/entity/useDeleteEntity';
import { useSelector } from 'react-redux';
import { DeleteConfirmationModal } from '../../DeleteConfirmationModal/DeleteConfirmationModal';
import { useTranslation } from 'react-i18next';
import { useAssignEntityToLesson } from '../../../api/refs/useAssignEntityToLesson';
import { StyledDropdown } from '../../KsuDropdown/StyledDropdown';
import { Dropdown } from 'semantic-ui-react';
import { useEditEntity } from '../../../api/entity/useEditEntity';

export const EntityItemExpanded = ({
  lessonsOptions,
  entityName,
  item,
  onConfirm,
  onEdit,
}) => {
  const { t } = useTranslation('tr');
  const { user } = useSelector((store) => store.auth);
  const [isContentShown, setIsContentShown] = useState(false);
  const { removeEntityFromArrayField, addEntityToArrayField } =
    useAssignEntityToLesson(entityName);
  const [selectedLesson, setSelectedLesson] = useState('');
  const { deleteEntity } = useDeleteEntity(entityName);
  const { editEntity } = useEditEntity(entityName);
  const findFirstImage = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const imgElement = doc.querySelector('img');
    if (imgElement) {
      return imgElement.outerHTML; // Возвращает HTML-код первого изображения
    } else {
      return null;
    }
  };
  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      if (item?.lessons.length > 0) {
        for (let lessonId of item?.lessons) {
          await removeEntityFromArrayField(entityName, item?.id, lessonId);
        }
      }
      await deleteEntity(item.id);
      onConfirm();
    } catch (err) {
      throw new Error(err);
    }
  };

  const assignToLesson = async () => {
    try {
      await addEntityToArrayField(entityName, item.id, selectedLesson);
      await editEntity({
        id: item.id,
        lessons: [...item.lessons, selectedLesson],
      });
      setSelectedLesson('');
      onConfirm();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <EntityItemStyled
      className={clsx({
        entityName,
        expanded: isContentShown,
      })}
      role="button"
      onClick={() => setIsContentShown((prev) => !prev)}>
      <div className="item-content">
        <div className="image">
          {item?.imageUrl
? (
            <img src={item?.imageUrl} alt="item.title" />
          )
: (
            <HTMLRenderer htmlContent={findFirstImage(item?.text)} />
          )}
        </div>
        <div className="item-title">
          <div className="btn-block">
            {user?.uid === item?.createdBy.uid && (
              <ButtonIconStyled onClick={(e) => onEdit(e, item)}>
                <EditIcon />
              </ButtonIconStyled>
            )}
            <ButtonIconStyled>
              <PrintIcon />
            </ButtonIconStyled>
            {user?.uid === item?.createdBy.uid && (
              <DeleteConfirmationModal
                modalTitle={t(`delete.${entityName}.title`)}
                modalContent={t(`delete.${entityName}.content`)}
                onConfirm={handleDelete}
                onCansel={() => {}}
              />
            )}
            {user?.uid === item?.createdBy.uid && (
              <>
                <StyledDropdown className="lessons-dropdown">
                  <Dropdown
                    placeholder="Виберіть один з уроків"
                    fluid
                    search
                    selection
                    value={selectedLesson}
                    onChange={(e, data) => setSelectedLesson(data.value)}
                    options={lessonsOptions}
                  />
                </StyledDropdown>

                <ButtonIconStyled
                  disabled={!selectedLesson}
                  onClick={assignToLesson}>
                  <LinkIcon />
                </ButtonIconStyled>
              </>
            )}
          </div>
          <h1>{item?.title || <span className="light">No title</span>}</h1>
          <div>
            <div>
              <b>Автор: </b>
              {item.createdBy?.name}
            </div>
            <div>
              <b>Створено: </b>
              {item && getDateLocalString(JSON.parse(item?.createdAt))}
            </div>
            <div>
              <b>Кількість використань: </b>
              {item?.lessons?.length || 0}
            </div>
          </div>
        </div>
      </div>
      {isContentShown && (
        <div className="text">
          <HTMLRenderer htmlContent={item?.text} />
        </div>
      )}
    </EntityItemStyled>
  );
};
