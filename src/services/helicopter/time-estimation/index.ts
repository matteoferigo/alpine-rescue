import { getHelicopterRiseTime } from "@/services/helicopter/rise-time";
import { getHelicopterSpeed } from "@/services/helicopter/speed";

export const calculateHelicopterTimeEstimation = (
  distance: number,
  elevation: number
) => {
  // Recupero la velocità di crocera
  const speed = getHelicopterSpeed();
  // Tempo di salita e discesa (in secondi)
  const riseTime = getHelicopterRiseTime(elevation);
  const fallTime = getHelicopterRiseTime(100);

  // Calcolo il tempo di percorrenza (in secondi)
  return Math.round(distance / speed) + riseTime + fallTime;
};
