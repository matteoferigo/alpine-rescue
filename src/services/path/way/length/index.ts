import { getDistance } from "ol/sphere";

export const calculateWayLength = (
  fromPoint: number[],
  toPoint: number[],
  elevation: number
) => {
  // Calcolo la distanza da percorrere
  const distance = getDistance(fromPoint, toPoint);

  // Restituisco valore se percorso in piano
  if (!elevation) {
    return distance;
  }

  // Calcolare l'ipotenusa
  const hypotenuse = Math.sqrt(distance ** 2 + elevation ** 2);

  return Math.round(hypotenuse);
};
