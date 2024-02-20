export const getDateFromTimeStep = (timeStep) => {
  const date = timeStep.toDate();
  return date.toLocaleDateString();
};