import OffroadRouteContext from "@/contexts/route/offroad";
import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import { createElement, useState, type PropsWithChildren } from "react";

const OffroadRouteProvider = ({ children }: PropsWithChildren) => {
  const [destinationCoords, setDestinationCoords] = useState<Coordinate>();
  const [trailEndCoords, setTrailEndCoords] = useState<Coordinate>();

  const [offroadPath, setOffroadPath] = useState<Feature<Geometry>[]>();

  const [offroadDuration, setOffroadDuration] = useState<number>();

  const [offroadElevationGain, setOffroadElevationGain] = useState<number>();

  const value = {
    destinationCoords,
    setDestinationCoords,
    trailEndCoords,
    setTrailEndCoords,

    offroadPath,
    setOffroadPath,

    offroadDuration,
    setOffroadDuration,

    offroadElevationGain,
    setOffroadElevationGain,
  };

  return createElement(OffroadRouteContext.Provider, { value }, children);
};

export default OffroadRouteProvider;
