import { BELL_HELICOPTER } from "@/const/helicopter";
import { convertKmhToMs } from "@/services/path/speed/convert/kmh-to-ms";
import { convertKnotsToKmh } from "@/services/path/speed/convert/knots-to-kmh";

export const getHelicopterSpeed = () => {
  // Velocità media (di crocera)
  const speedAvg = convertKnotsToKmh(BELL_HELICOPTER.cruise_speed_sl_knots);

  // NB: va sommato il tempo di salita e quello di discesa
  return convertKmhToMs(speedAvg);
};
