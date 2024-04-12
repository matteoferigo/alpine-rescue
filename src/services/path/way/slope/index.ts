export const calculateWaySlope = (distance: number, elevation: number) => {
  // Calcolare l'angolo in radianti
  const radians = Math.atan(distance / elevation);

  // Convertire l'angolo da radianti a gradi
  const degrees = radians * (180 / Math.PI);

  return Math.round(degrees);
};
