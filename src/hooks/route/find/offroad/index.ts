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
    setOffroadDuration,
    setOffroadElevationGain,
  } = useOffroadRouteContext();

  return async function (destinationCoords: Coordinate) {
    try {
      // Cerco sentiero più vicino
      const offroadNodess = await searchShorterOffroad(destinationCoords, 500);
      const closerTrail = offroadNodess[0];
      const trailEndCoords = closerTrail.nodes[0];

      // Assengo estremi del sentiero
      setDestinationCoords(destinationCoords);
      setTrailEndCoords(trailEndCoords);
      // Definisco percorso fuori sentiero
      setOffroadNodes([...closerTrail.nodes, destinationCoords]);
      setOffroadDuration(closerTrail.duration);
      setOffroadElevationGain(
        calculateElevationGain(trailEndCoords[2], destinationCoords[2])
      );

      // TEMP: Mostro dati relativi al calcolo
      // offroadNodesLayer.setSource(
      //   createNodesVectorSource(
      //     closerTrail.graph.reduce((acc, nodes) => [...acc, ...nodes], [])
      //   )
      // );
      // offroadWaysLayer.setSource(
      //   createWaysVectorSource(offroadNodess.map((path) => path.nodes))
      // );
      // offroadGraphLayer.setSource(
      //   createNodesVectorSource(closerTrail.graph)
      // );

      // Restituisco coordinate ultimo punto sul sentiero
      return trailEndCoords;
    } catch (error) {
      showError(error);
    }
  };
};
