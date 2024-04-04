import dateFormat from 'dateformat';

export const getDateLocalString = (timestamp) => {
  const milliseconds = timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6);
  const newDate = new Date(milliseconds);

  return dateFormat(newDate, 'dd.mm.yyyy');
};
