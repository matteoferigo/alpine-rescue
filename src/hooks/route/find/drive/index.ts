import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { createRouteFeatures } from "@/services/map/features/route";
import { searchShorterRoute } from "@/services/search/shorter-route";
import type { Coordinate } from "ol/coordinate";

export const useFindDriveRoute = () => {
  const showError = useShowErrorMessage();
  const {
    setTrailheadCoords,
    setTrailPath,
    setTrailDuration,
    setRoadPath,
    setRoadDuration,
  } = useDriveRouteContext();

  return async function (fromPoint: Coordinate, toPoint: Coordinate) {
    try {
      // Calcolo il percorso più veloce
      const { shorterPath } = await searchShorterRoute(fromPoint, toPoint);

      // Definisco sentiero
      if (shorterPath.trailDuration) {
        // Correggo graficamente i risultati forzando gli estremi
        const trailDirections = shorterPath.trailDirections!
        trailDirections.features.at(0)!.geometry.coordinates.unshift(trailDirections.metadata.query.coordinates[0])
        trailDirections.features.at(-1)!.geometry.coordinates.push(trailDirections.metadata.query.coordinates[0])
        // Definisco percorso sul sentiero
        setTrailheadCoords(shorterPath.trailheadPoint);
        setTrailPath(createRouteFeatures(trailDirections));
        setTrailDuration(shorterPath.trailDuration);
      } else {
        setTrailDuration(0);
      }
      
      // Correggo graficamente i risultati forzando gli estremi
      const roadDirections = shorterPath.roadDirections;
      roadDirections.features.at(0)!.geometry.coordinates.unshift(roadDirections.metadata.query.coordinates[0])
      roadDirections.features.at(-1)!.geometry.coordinates.push(roadDirections.metadata.query.coordinates[1])
      // Definisco strada fino ad attacco sentiero
      setRoadPath(createRouteFeatures(roadDirections));
      setRoadDuration(shorterPath.roadDuration);
    } catch (error) {
      showError(error);
    }
  };
};
