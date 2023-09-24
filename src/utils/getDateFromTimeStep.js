export const getDateFromTimeStep = (timeStep) => {
  return  new Date(timeStep.seconds * timeStep.nanoseconds / 1000000)
    .toString();
};
