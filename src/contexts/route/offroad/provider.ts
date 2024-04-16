import OffroadRouteContext from "@/contexts/route/offroad";
import type { WeightedArch } from "@/services/graph/types";
import type { Coordinate } from "ol/coordinate";
import { createElement, useState, type PropsWithChildren } from "react";

const OffroadRouteProvider = ({ children }: PropsWithChildren) => {
  const [destinationCoords, setDestinationCoords] = useState<Coordinate>();
  const [trailEndCoords, setTrailEndCoords] = useState<Coordinate>();

  const [offroadNodes, setOffroadNodes] = useState<Coordinate[]>();
  const [offroadArchs, setOffroadArchs] = useState<WeightedArch[]>();
  const [offroadGraph, setOffroadGraph] = useState<Coordinate[][]>();

  const [offroadDistance, setOffroadDistance] = useState<number>();
  const [offroadDuration, setOffroadDuration] = useState<number>();
  const [offroadElevationGain, setOffroadElevationGain] = useState<number>();

  const value = {
    destinationCoords,
    setDestinationCoords,
    trailEndCoords,
    setTrailEndCoords,

    offroadNodes,
    setOffroadNodes,
    offroadArchs,
    setOffroadArchs,
    offroadGraph,
    setOffroadGraph,

    offroadDistance,
    setOffroadDistance,
    offroadDuration,
    setOffroadDuration,
    offroadElevationGain,
    setOffroadElevationGain,
  };

  return createElement(OffroadRouteContext.Provider, { value }, children);
};

export default OffroadRouteProvider;
