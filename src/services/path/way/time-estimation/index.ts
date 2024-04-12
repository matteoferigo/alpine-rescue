import { UPHILL_SPEED } from "@/const/speed";
import { getSpeedAvg } from "@/services/path/speed/avg";
import { calculateWaySlope } from "@/services/path/way/slope";

export const calculateWayTimeEstimation = (
  distance: number,
  elevation: number,
  descending: boolean
) => {
  // Restituisco valore se percorso in piano
  if (!elevation) {
    const speed = UPHILL_SPEED[0];
    return Math.round(distance * speed.ms);
  }

  // Recupero la velocità media
  const slope = calculateWaySlope(distance, elevation);
  const speed = getSpeedAvg(slope, descending);

  // Calcolo il tempo di percorrenza (in secondi)
  return Math.round(distance / speed);
};
