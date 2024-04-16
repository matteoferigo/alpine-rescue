import { getHelicopterRiseTime } from "@/services/helicopter/rise-time";
import { getHelicopterSpeed } from "@/services/helicopter/speed";
import { calculateWindFactor } from "@/services/helicopter/wind-factor";
import type { OpenWeatherResponse } from "@/services/openweather/types/weather";

export const calculateHelicopterTimeEstimation = (
  distance: number,
  elevation: number,
  weather?: OpenWeatherResponse
) => {
  // Recupero la velocità di crocera
  const maxSpeed = getHelicopterSpeed();
  // Calcolo il coefficiente di impatto del vento
  const windSpeed = weather?.wind.speed;
  const windFactor = windSpeed ? calculateWindFactor(windSpeed, maxSpeed) : 1;

  // Tempo di salita e discesa (in secondi)
  const riseTime = getHelicopterRiseTime(elevation);
  const fallTime = getHelicopterRiseTime(100);
  // Calcolo tempo di accelerazione (costante)
  const accelerationTime = maxSpeed / 2;
  const accelerationDistance = 0.5 * maxSpeed * accelerationTime;
  // Aggiungo tempo di decelerazione (costante)
  const decelerationTime = accelerationTime;
  const decelerationDistance = accelerationDistance;
  // Calcolo tempo di velocità da crocera
  if (accelerationDistance + decelerationDistance <= distance) {
    const cruisingDistance =
      distance - (accelerationDistance + decelerationDistance);
    const cruisingTime = cruisingDistance / maxSpeed;

    // Calcolo il tempo di percorrenza (in secondi)
    return (
      windFactor *
      (riseTime + accelerationTime + cruisingTime + decelerationTime + fallTime)
    );
  }
  // Se velocità di crocera non raggiunta
  return windFactor * (riseTime + Math.sqrt(distance / maxSpeed) + fallTime);
};
