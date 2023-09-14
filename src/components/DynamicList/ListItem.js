import React, { useRef } from 'react';
import { ButtonIconBasisStyled } from '../ButtonStyled';
import { InputContrastStyled } from '../InputStyled';
import { ReactComponent as MoveIcon } from '../../assets/move.svg';
import { ReactComponent as RemoveIcon } from '../../assets/minus.svg';
import { useDrag, useDrop } from 'react-dnd';
import { DndItemStyled } from './style';

export const ListItem = ({
  field,
  index,
  onChange,
  handleRemove,
  moveItem,
}) => {
  const ref = useRef(null);

  // https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_js/04-sortable/simple?from-embed=&file=/src/Container.js:20-39

  const [{ handlerId }, drop] = useDrop({
    accept: 'input',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item?.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag, preview] = useDrag({
    type: 'input',
    item: () => {
      return { id: field?.id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  drag(drop(ref));

  return (
    <DndItemStyled
      draggable
      key={field?.id}
      ref={ref}
      className="dnd-item"
      style={{ opacity }}
    >
      <InputContrastStyled
        ref={preview}
        id={`${field?.id}`}
        name={`${field?.id}`}
        placeholder="Наступний елемент списку"
        value={field?.value}
        onChange={(e) => onChange(e, field?.id)}
      />
      <ButtonIconBasisStyled
        className="remove-handle absolute-rite"
        onClick={() => handleRemove(field?.id)}
      >
        <RemoveIcon />
      </ButtonIconBasisStyled>
      <ButtonIconBasisStyled
        ref={drag}
        className="drag-handle absolute-rite"
        data-handler-id={handlerId}
      >
        <MoveIcon />
      </ButtonIconBasisStyled>
    </DndItemStyled>
  );
};
