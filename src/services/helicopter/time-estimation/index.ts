import { getHelicopterAcceleration } from "@/services/helicopter/acceleration";
import { getHelicopterSpeed } from "@/services/helicopter/speed";
import type { OpenWeatherResponse } from "@/services/openweather/types/weather";

export const calculateHelicopterTimeEstimation = (
  distance: number,
  weather?: OpenWeatherResponse
) => {
  // Recupero la velocità di crocera
  const maxSpeed = getHelicopterSpeed();
  const maxAcceleration = getHelicopterAcceleration();

  // Calcolo la velocità risultante in funzione alla velocità e direzione del vento
  const windSpeed = weather?.wind.speed ?? 0;
  // Dato che la direzione del vento e dell'elicottero possono variare
  // Considero il caso peggiore in cui il vento soffia contro (180°)
  const windCosine = -1;
  // Applico la legge dei coseni per calcolare la risultante
  const speed = !windSpeed
    ? maxSpeed
    : Math.sqrt(
        maxSpeed ** 2 + windSpeed ** 2 + 2 * maxSpeed * windSpeed * windCosine
      );

  // Calcolo la distanza massima raggiungibile con un accelerazione costante (MUA)
  const maxDistanceUAM = speed ** 2 / maxAcceleration;

  // Calcolo la distanza da percorrere, peggiorando il percorso ideale in linea d'aria
  // Considerando i metri di elevazione dal suolo (decollo e ascesa)
  const totalLength = distance * 1.5 + 2000 + 1000;
  // Calcolo il tempo impiegato in condizioni ideali
  let time;
  // Se velocità di crocera non raggiunta
  if (maxDistanceUAM === totalLength) {
    time = 2 * (speed / maxAcceleration);
  } else if (maxDistanceUAM < totalLength) {
    time = Math.sqrt(totalLength / maxAcceleration);
    // Se velocità di crocera viene raggiunta
  } else {
    const distanceURM = totalLength - maxDistanceUAM;
    time = 2 * (speed / maxAcceleration) + distanceURM / speed;
  }

  // Tempo di percorrenza (in secondi) considerando le condizioni metereologiche
  return time;
};
