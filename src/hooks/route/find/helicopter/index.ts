import { useHelicopterRouteContext } from "@/contexts/route/helicopter/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { createRouteFeatures } from "@/services/map/features/route";
import { createWayFeatures } from "@/services/map/features/way";
import { getFootDirections } from "@/services/openroute/directions/foot";
import { searchCloserHelipadPoint } from "@/services/search/closer-helipad";
import type { Coordinate } from "ol/coordinate";

export const useFindHelicopterRoute = () => {
  const showError = useShowErrorMessage();
  const { setHelipadCoords, setTrailPath, setFlightPath } =
    useHelicopterRouteContext();

  return async function (fromPoint: Coordinate, toPoint: Coordinate) {
    try {
      // Cerco elisuperfici vicine
      const closerHelipad = await searchCloserHelipadPoint(toPoint);

      // Definisco volo
      setHelipadCoords(closerHelipad);
      setFlightPath(createWayFeatures([fromPoint, closerHelipad]));

      // Definisco sentiero
      const trailDirections = await getFootDirections(closerHelipad, toPoint);
      setTrailPath(createRouteFeatures(trailDirections));
    } catch (error) {
      showError(error);
    }
  };
};
