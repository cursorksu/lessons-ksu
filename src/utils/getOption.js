export const getOption = (el) => ({
  key: el.id,
  value: el.id,
  text: !el.firstName
    ? <div className='ksu-option'>
      <div>{`${el.firstName} ${el.lastName}`}</div>
      <div className='description'>{el.email}</div>
    </div>
    : el.email,
  image: { avatar: el.avatar, src: el.avatar },
});
