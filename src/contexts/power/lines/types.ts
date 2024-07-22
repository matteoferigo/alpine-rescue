import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type { Dispatch, SetStateAction } from "react";

export type PowerNetworkContextValue = {
  powerStation: Coordinate | undefined;
  setPowerStation: Dispatch<SetStateAction<Coordinate | undefined>>;
  powerPoles: Coordinate[][] | undefined;
  setPowerPoles: Dispatch<SetStateAction<Coordinate[][] | undefined>>;
  powerLines: Feature<Geometry>[] | undefined;
  setPowerLines: Dispatch<SetStateAction<Feature<Geometry>[] | undefined>>;
};
