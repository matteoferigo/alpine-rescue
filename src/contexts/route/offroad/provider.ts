import OffroadRouteContext from "@/contexts/route/offroad";
import type { WeightedArch } from "@/services/graph/types";
import type { Coordinate } from "ol/coordinate";
import { createElement, useState, type PropsWithChildren } from "react";

const OffroadRouteProvider = ({ children }: PropsWithChildren) => {
  const [destinationCoords, setDestinationCoords] = useState<Coordinate>();
  const [trailEndCoords, setTrailEndCoords] = useState<Coordinate>();
  const [offroadGraph, setOffroadGraph] = useState<Coordinate[][]>();
  const [offroadElevationGain, setOffroadElevationGain] = useState<number>();

  const [offroadNodesAStandard, setOffroadNodesAStandard] =
    useState<Coordinate[]>();
  const [offroadArchsAStandard, setOffroadArchsAStandard] =
    useState<WeightedArch[]>();
  const [offroadDistanceAStandard, setOffroadDistanceAStandard] =
    useState<number>();
  const [offroadDurationAStandard, setOffroadDurationAStandard] =
    useState<number>();

  // (alternativa)
  const [offroadNodesABidirectional, setOffroadNodesABidirectional] =
    useState<Coordinate[]>();
  const [offroadArchsABidirectional, setOffroadArchsABidirectional] =
    useState<WeightedArch[]>();
  const [offroadDistanceABidirectional, setOffroadDistanceABidirectional] =
    useState<number>();
  const [offroadDurationABidirectional, setOffroadDurationABidirectional] =
    useState<number>();

  const value = {
    destinationCoords,
    setDestinationCoords,
    trailEndCoords,
    setTrailEndCoords,
    offroadGraph,
    setOffroadGraph,
    offroadElevationGain,
    setOffroadElevationGain,

    offroadNodesAStandard,
    setOffroadNodesAStandard,
    offroadArchsAStandard,
    setOffroadArchsAStandard,
    offroadDistanceAStandard,
    setOffroadDistanceAStandard,
    offroadDurationAStandard,
    setOffroadDurationAStandard,

    offroadNodesABidirectional,
    setOffroadNodesABidirectional,
    offroadArchsABidirectional,
    setOffroadArchsABidirectional,
    offroadDistanceABidirectional,
    setOffroadDistanceABidirectional,
    offroadDurationABidirectional,
    setOffroadDurationABidirectional,
  };

  return createElement(OffroadRouteContext.Provider, { value }, children);
};

export default OffroadRouteProvider;
