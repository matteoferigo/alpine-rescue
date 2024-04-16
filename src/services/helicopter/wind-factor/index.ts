// Wind Factor Formula

export const calculateWindFactor = (
  windSpeed: number,
  helicopterSpeed: number
) => {
  return 1 + (2 * windSpeed) / helicopterSpeed;
};
