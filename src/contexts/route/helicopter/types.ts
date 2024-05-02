import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type { Dispatch, SetStateAction } from "react";

export type HelicopterRouteContextValue = {
  heliportCoords: Coordinate | undefined;
  setHeliportCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  helipadCoords: Coordinate | undefined;
  setHelipadCoords: Dispatch<SetStateAction<Coordinate | undefined>>;

  trailPath: Feature<Geometry>[] | undefined;
  setTrailPath: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;
  flightPath: Feature<Geometry>[] | undefined;
  setFlightPath: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;

  trailDuration: number | undefined;
  setTrailDuration: Dispatch<SetStateAction<number | undefined>>;
  flightDuration: number | undefined;
  setFlightDuration: Dispatch<SetStateAction<number | undefined>>;

  trailElevationGain: number | undefined;
  setTrailElevationGain: Dispatch<SetStateAction<number | undefined>>;
  flightElevationGain: number | undefined;
  setFlightElevationGain: Dispatch<SetStateAction<number | undefined>>;
};
