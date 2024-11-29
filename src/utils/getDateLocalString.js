import dateFormat from 'dateformat';

export const getDateLocalString = (timestamp) => {
  const milliseconds = timestamp && timestamp?.seconds * 1000 + Math.round(timestamp?.nanoseconds / 1e6);
  const newDate = timestamp && new Date(milliseconds);

  return timestamp && dateFormat(newDate, 'dd.mm.yyyy');
};
export const getDateObject = (timestamp) => {
  const milliseconds = timestamp?.seconds * 1000 + Math.round(timestamp?.nanoseconds / 1e6);
  const newDate = new Date(milliseconds);

  return newDate;
};
