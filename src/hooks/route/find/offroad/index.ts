import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { calculateElevationGain } from "@/services/path/way/elevation-gain";
import { searchShorterOffroad } from "@/services/search/shorter-offroad";
import type { Coordinate } from "ol/coordinate";

export const useFindOffroadRoute = () => {
  const showError = useShowErrorMessage();
  const {
    setDestinationCoords,
    setTrailEndCoords,
    setOffroadNodes,
    setOffroadArchs,
    setOffroadGraph,
    setOffroadDistance,
    setOffroadDuration,
    setOffroadElevationGain,
  } = useOffroadRouteContext();

  return async function (destinationCoords: Coordinate) {
    try {
      // Cerco sentiero più vicino
      const offroadNodes = await searchShorterOffroad(destinationCoords, 500);
      const closerTrail = offroadNodes[0];
      const trailEndCoords = closerTrail.nodes[0];

      // Assengo estremi del sentiero
      setDestinationCoords(destinationCoords);
      setTrailEndCoords(trailEndCoords);
      // Definisco percorso fuori sentiero
      setOffroadNodes([...closerTrail.nodes, destinationCoords]);
      setOffroadDistance(closerTrail.distance);
      setOffroadDuration(closerTrail.duration);
      setOffroadElevationGain(
        calculateElevationGain(trailEndCoords[2], destinationCoords[2])
      );

      // Salvo dati relativi al calcolo
      setOffroadArchs(closerTrail.archs);
      setOffroadGraph(closerTrail.graph);

      // Restituisco coordinate ultimo punto sul sentiero
      return trailEndCoords;
    } catch (error) {
      showError(error);
    }
  };
};
