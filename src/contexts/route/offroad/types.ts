import type { WeightedArch } from "@/services/graph/types";
import type { Coordinate } from "ol/coordinate";
import type { Dispatch, SetStateAction } from "react";

export type OffroadRouteContextValue = {
  destinationCoords: Coordinate | undefined;
  setDestinationCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  trailEndCoords: Coordinate | undefined;
  setTrailEndCoords: Dispatch<SetStateAction<Coordinate | undefined>>;

  offroadNodes: Coordinate[] | undefined;
  setOffroadNodes: Dispatch<SetStateAction<Coordinate[] | undefined>>;
  offroadArchs: WeightedArch[] | undefined;
  setOffroadArchs: Dispatch<SetStateAction<WeightedArch[] | undefined>>;
  offroadGraph: Coordinate[][] | undefined;
  setOffroadGraph: Dispatch<SetStateAction<Coordinate[][] | undefined>>;

  offroadDistance: number | undefined;
  setOffroadDistance: Dispatch<SetStateAction<number | undefined>>;
  offroadDuration: number | undefined;
  setOffroadDuration: Dispatch<SetStateAction<number | undefined>>;
  offroadElevationGain: number | undefined;
  setOffroadElevationGain: Dispatch<SetStateAction<number | undefined>>;

  // (alternativa)
  offroadAlternativeNodes: Coordinate[] | undefined;
  setOffroadAlternativeNodes: Dispatch<
    SetStateAction<Coordinate[] | undefined>
  >;
  offroadAlternativeArchs: WeightedArch[] | undefined;
  setOffroadAlternativeArchs: Dispatch<
    SetStateAction<WeightedArch[] | undefined>
  >;
  offroadAlternativeDistance: number | undefined;
  setOffroadAlternativeDistance: Dispatch<SetStateAction<number | undefined>>;
  offroadAlternativeDuration: number | undefined;
  setOffroadAlternativeDuration: Dispatch<SetStateAction<number | undefined>>;
};
