export const calculateSlope = (distance: number, elevation: number) => {
  // Calcolare l'angolo in radianti
  const radians = Math.atan(elevation / distance);

  // Convertire l'angolo da radianti a gradi
  const degrees = radians * (180 / Math.PI);

  // Converto in percentuale di pendenza
  const percentSlope = (degrees / 90) * 100;

  return Math.round(percentSlope);
};
