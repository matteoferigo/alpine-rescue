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
    setOffroadGraph,
    setOffroadElevationGain,

    setOffroadNodesAStandard,
    setOffroadArchsAStandard,
    setOffroadDistanceAStandard,
    setOffroadDurationAStandard,

    setOffroadNodesABidirectional,
    setOffroadArchsABidirectional,
    setOffroadDistanceABidirectional,
    setOffroadDurationABidirectional,
  } = useOffroadRouteContext();

  return async function (destinationCoords: Coordinate) {
    try {
      // Cerco sentiero più vicino
      const [offroadNodesAStandard, offroadNodesABidirectional] =
        await searchShorterOffroad(destinationCoords, 500);
      const shorterOffroadAStandard = offroadNodesAStandard[0];
      const trailEndCoords = shorterOffroadAStandard.nodes[0];

      // Assengo estremi del sentiero
      setDestinationCoords(destinationCoords);
      setTrailEndCoords(trailEndCoords);
      setOffroadElevationGain(
        calculateElevationGain(trailEndCoords[2], destinationCoords[2])
      );
      setOffroadGraph(shorterOffroadAStandard.graph);
      // Definisco percorso fuori sentiero
      setOffroadNodesAStandard([
        ...shorterOffroadAStandard.nodes,
        destinationCoords,
      ]);
      setOffroadDistanceAStandard(shorterOffroadAStandard.distance);
      setOffroadDurationAStandard(shorterOffroadAStandard.duration);
      setOffroadArchsAStandard(shorterOffroadAStandard.archs);
      // (Salvo dati alternativi)
      const shorterOffroadABidirectional = offroadNodesABidirectional[0];
      setOffroadNodesABidirectional(shorterOffroadABidirectional.nodes);
      setOffroadArchsABidirectional(shorterOffroadABidirectional.archs);
      setOffroadDistanceABidirectional(shorterOffroadABidirectional.distance);
      setOffroadDurationABidirectional(shorterOffroadABidirectional.duration);

      // Restituisco coordinate ultimo punto sul sentiero
      return trailEndCoords;
    } catch (error) {
      showError(error);
    }
  };
};
