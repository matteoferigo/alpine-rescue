import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type { Dispatch, SetStateAction } from "react";

export type OffroadRouteContextValue = {
  destinationCoords: Coordinate | undefined;
  setDestinationCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  trailEndCoords: Coordinate | undefined;
  setTrailEndCoords: Dispatch<SetStateAction<Coordinate | undefined>>;

  offroadPath: Feature<Geometry>[] | undefined;
  setOffroadPath: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;
};
