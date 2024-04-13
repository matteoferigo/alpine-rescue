import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { createRouteFeatures } from "@/services/map/features/route";
import { searchShorterRoute } from "@/services/search/shorter-route";
import type { Coordinate } from "ol/coordinate";

export const useFindDriveRoute = () => {
  const showError = useShowErrorMessage();
  const { setTrailheadCoords, setTrailPath, setRoadPath } =
    useDriveRouteContext();

  return async function (fromPoint: Coordinate, toPoint: Coordinate) {
    try {
      // Calcolo il percorso più veloce
      const { shorterPath } = await searchShorterRoute(fromPoint, toPoint);

      // Definisco sentiero
      setTrailheadCoords(shorterPath.trailheadPoint);
      setTrailPath(createRouteFeatures(shorterPath.trailDirections));
      // Definisco strata fino ad attacco sentiero
      setRoadPath(createRouteFeatures(shorterPath.roadDirections));
    } catch (error) {
      showError(error);
    }
  };
};
