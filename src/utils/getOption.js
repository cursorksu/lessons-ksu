export const getOption = (el, selectedItemIdsList) => ({
  key: el.id,
  value: el.id,
  disabled: selectedItemIdsList?.includes(el.id),
  text: el.firstName
    ? <div className='ksu-option'>
      <div>{`${el.firstName} ${el.lastName}`}</div>
      <div className='description'>{el.email}</div>
    </div>
    : <div className=''>{el.title}</div>,
  image: {
    avatar: el.avatar?.length ? el.avatar[0].base64 : el.avatar,
    src: el.avatar?.length ? el.avatar[0].base64 : el.avatar },
});
