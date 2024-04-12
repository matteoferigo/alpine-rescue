export const getHelicopterRiseTime = (elevation: number) => {
  // Velocità di salita (senza vento)
  // Media 600 piedi al minuto (in secondi)
  const riseTime = 3048;

  // Calcolo il tempo di percorrenza (in secondi)
  return elevation / (riseTime * 0.006);
};
