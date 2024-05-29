import { AVG_SPEED_MS } from "@/const/speed";
import { getSpeedAvg } from "@/services/path/speed/avg";
import { calculateSlope } from "@/services/path/way/slope";

export const calculateWayTimeEstimation = (
  distance: number,
  elevationGain: number,
  descending: boolean,
  terrainFactor: number = 1
) => {
  // Restituisco valore se percorso in piano
  if (!elevationGain) {
    const speed = AVG_SPEED_MS;
    return Math.round(distance / speed);
  }

  // Recupero la velocità media
  const slope = +calculateSlope(distance, elevationGain).toFixed(1);
  const speed = +(getSpeedAvg(slope, descending) * terrainFactor).toFixed(2);

  // Calcolo il tempo di percorrenza (in secondi)
  return Math.round(distance / speed);
};
