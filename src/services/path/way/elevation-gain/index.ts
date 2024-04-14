export const calculateElevationGain = (
  fromElevation: number,
  toElevation: number
) => {
  const elevationGain =
    fromElevation > toElevation
      ? fromElevation - toElevation
      : toElevation - fromElevation;

  return Math.round(elevationGain);
};
