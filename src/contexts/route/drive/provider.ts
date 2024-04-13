import DriveRouteContext from "@/contexts/route/drive";
import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import { createElement, useState, type PropsWithChildren } from "react";

const DriveRouteProvider = ({ children }: PropsWithChildren) => {
  const [trailheadCoords, setTrailheadCoords] = useState<Coordinate>();
  const [departureCoords, setDepartureCoords] = useState<Coordinate>();

  const [trailPath, setTrailPath] = useState<Feature<Geometry>[]>();
  const [roadPath, setRoadPath] = useState<Feature<Geometry>[]>();

  const [trailDuration, setTrailDuration] = useState<number>();
  const [roadDuration, setRoadDuration] = useState<number>();

  const [trailElevationGain, setTrailElevationGain] = useState<number>();
  const [roadElevationGain, setRoadElevationGain] = useState<number>();

  const value = {
    trailheadCoords,
    setTrailheadCoords,
    departureCoords,
    setDepartureCoords,

    trailPath,
    setTrailPath,
    roadPath,
    setRoadPath,

    trailDuration,
    setTrailDuration,
    roadDuration,
    setRoadDuration,

    trailElevationGain,
    setTrailElevationGain,
    roadElevationGain,
    setRoadElevationGain,
  };

  return createElement(DriveRouteContext.Provider, { value }, children);
};

export default DriveRouteProvider;
