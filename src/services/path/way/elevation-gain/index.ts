export const calculateWayElevationGain = (
  fromElevation: number,
  toElevation: number
) => {
  const elevationGain =
    fromElevation > toElevation
      ? fromElevation - toElevation
      : toElevation - fromElevation;

  return Math.round(elevationGain);
};
