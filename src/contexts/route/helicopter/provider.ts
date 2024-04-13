import HelicopterRouteContext from "@/contexts/route/helicopter";
import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import { createElement, useState, type PropsWithChildren } from "react";

const HelicopterRouteProvider = ({ children }: PropsWithChildren) => {
  const [helipadCoords, setHelipadCoords] = useState<Coordinate>();
  const [heliportCoords, setHeliportCoords] = useState<Coordinate>();

  const [trailPath, setTrailPath] = useState<Feature<Geometry>[]>();
  const [flightPath, setFlightPath] = useState<Feature<Geometry>[]>();

  const value = {
    helipadCoords,
    setHelipadCoords,
    heliportCoords,
    setHeliportCoords,

    trailPath,
    setTrailPath,
    flightPath,
    setFlightPath,
  };

  return createElement(HelicopterRouteContext.Provider, { value }, children);
};

export default HelicopterRouteProvider;
