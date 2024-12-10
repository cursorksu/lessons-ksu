import { useDrag } from 'react-dnd';
export const DndItem = ({ name, className, isDropped, type }) => {
  const [{ opacity }, drag] = useDrag(
    () => ({
      type,
      item: { name },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [name, type]
  );

  return (
    <span ref={drag} style={{ opacity }} name={name} className={className}>
      {isDropped ? <s>{name}</s> : name}
    </span>
  );
};
