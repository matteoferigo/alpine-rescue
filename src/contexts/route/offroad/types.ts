import type { WeightedArch } from "@/services/graph/types";
import type { Coordinate } from "ol/coordinate";
import type { Dispatch, SetStateAction } from "react";

export type OffroadRouteContextValue = {
  destinationCoords: Coordinate | undefined;
  setDestinationCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  trailEndCoords: Coordinate | undefined;
  setTrailEndCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  offroadGraph: Coordinate[][] | undefined;
  setOffroadGraph: Dispatch<SetStateAction<Coordinate[][] | undefined>>;
  offroadElevationGain: number | undefined;
  setOffroadElevationGain: Dispatch<SetStateAction<number | undefined>>;

  offroadNodesAStandard: Coordinate[] | undefined;
  setOffroadNodesAStandard: Dispatch<SetStateAction<Coordinate[] | undefined>>;
  offroadArchsAStandard: WeightedArch[] | undefined;
  setOffroadArchsAStandard: Dispatch<
    SetStateAction<WeightedArch[] | undefined>
  >;
  offroadDistanceAStandard: number | undefined;
  setOffroadDistanceAStandard: Dispatch<SetStateAction<number | undefined>>;
  offroadDurationAStandard: number | undefined;
  setOffroadDurationAStandard: Dispatch<SetStateAction<number | undefined>>;

  // (alternativa)
  offroadNodesABidirectional: Coordinate[] | undefined;
  setOffroadNodesABidirectional: Dispatch<
    SetStateAction<Coordinate[] | undefined>
  >;
  offroadArchsABidirectional: WeightedArch[] | undefined;
  setOffroadArchsABidirectional: Dispatch<
    SetStateAction<WeightedArch[] | undefined>
  >;
  offroadDistanceABidirectional: number | undefined;
  setOffroadDistanceABidirectional: Dispatch<
    SetStateAction<number | undefined>
  >;
  offroadDurationABidirectional: number | undefined;
  setOffroadDurationABidirectional: Dispatch<
    SetStateAction<number | undefined>
  >;
};
