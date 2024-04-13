import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type { Dispatch, SetStateAction } from "react";

export type DriveRouteContextValue = {
  trailheadCoords: Coordinate | undefined;
  setTrailheadCoords: Dispatch<SetStateAction<Coordinate | undefined>>;
  departureCoords: Coordinate | undefined;
  setDepartureCoords: Dispatch<SetStateAction<Coordinate | undefined>>;

  trailPath: Feature<Geometry>[] | undefined;
  setTrailPath: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;
  roadPath: Feature<Geometry>[] | undefined;
  setRoadPath: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;
};
