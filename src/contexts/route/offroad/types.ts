import type { Coordinate } from "ol/coordinate";
import type { Dispatch, SetStateAction } from "react";

export type OffroadRouteContextValue = {
  destinationCoords: Coordinate | undefined;
  setDestinationCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  trailEndCoords: Coordinate | undefined;
  setTrailEndCoords: Dispatch<SetStateAction<Coordinate | undefined>>;

  offroadNodes: Coordinate[] | undefined;
  setOffroadNodes: Dispatch<SetStateAction<Coordinate[] | undefined>>;

  offroadDuration: number | undefined;
  setOffroadDuration: Dispatch<SetStateAction<number | undefined>>;

  offroadElevationGain: number | undefined;
  setOffroadElevationGain: Dispatch<SetStateAction<number | undefined>>;
};
