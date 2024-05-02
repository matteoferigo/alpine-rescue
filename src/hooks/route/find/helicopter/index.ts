import { useHelicopterRouteContext } from "@/contexts/route/helicopter/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { getElevations } from "@/services/gmaps/elevation";
import { calculateHelicopterTimeEstimation } from "@/services/helicopter/time-estimation";
import { createRouteFeatures } from "@/services/map/features/route";
import { createWayFeatures } from "@/services/map/features/way";
import { getRouteDuration } from "@/services/openroute/directions/duration";
import { getFootDirections } from "@/services/openroute/directions/foot";
import type { OpenWeatherResponse } from "@/services/openweather/types/weather";
import { calculateElevationGain } from "@/services/path/way/elevation-gain";
import { searchCloserHelipadPoint } from "@/services/search/closer-helipad";
import { searchCloserHeliportPoint } from "@/services/search/closer-heliport";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

export const useFindHelicopterRoute = () => {
  const showError = useShowErrorMessage();
  const {
    setHeliportCoords,
    setHelipadCoords,
    setTrailPath,
    setFlightPath,
    setTrailDuration,
    setTrailElevationGain,
    setFlightDuration,
    setFlightElevationGain,
  } = useHelicopterRouteContext();

  return async function (
    fromPoint: Coordinate,
    toPoint: Coordinate,
    weather?: OpenWeatherResponse
  ) {
    try {
      // Cerco elisuperfici vicine
      const [closerHeliport, closerHelipad] = await Promise.all([
        searchCloserHeliportPoint(fromPoint),
        searchCloserHelipadPoint(toPoint),
      ]);

      // Definisco volo
      setHeliportCoords(closerHeliport);
      setHelipadCoords(closerHelipad);
      setFlightPath(createWayFeatures([closerHeliport, closerHelipad]));
      // Calcolo le altitudini
      const elevations = await getElevations([closerHeliport, closerHelipad]);
      closerHeliport[2] = elevations[0].elevation;
      closerHelipad[2] = elevations[1].elevation;
      // Calcolo tempo di percorrenza
      const distance = getDistance(closerHeliport, closerHelipad);
      const elevation = calculateElevationGain(
        closerHeliport[2],
        closerHelipad[2]
      );
      setFlightDuration(
        calculateHelicopterTimeEstimation(distance, elevation, weather)
      );
      setFlightElevationGain(elevation);

      // Definisco sentiero
      const trailDirections = await getFootDirections(closerHelipad, toPoint);
      setTrailPath(createRouteFeatures(trailDirections));
      setTrailDuration(getRouteDuration(trailDirections));
      setTrailElevationGain(
        calculateElevationGain(closerHelipad[2], toPoint[2])
      );
    } catch (error) {
      showError(error);
    }
  };
};
