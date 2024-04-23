export const getOption = (el, selectedItemIdsList) => ({
  key: el.id,
  value: el.id,
  disabled: selectedItemIdsList?.some(item => item.id === el.id),
  text: el.firstName
    ? <div className='ksu-option'>
      <div>{`${el.firstName} ${el.lastName}`}</div>
      <div className='description'>{el.email}</div>
    </div>
    : <div className=''>{el.title}</div>,
});
