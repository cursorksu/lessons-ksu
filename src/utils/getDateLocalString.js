export const getDateLocalString = (date) => {
  let newDate = date;

  if (date.seconds) {
    newDate = new Date(date);
  }

  const userLocale = navigator.language;
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return  newDate.toLocaleDateString(userLocale, options);
};
