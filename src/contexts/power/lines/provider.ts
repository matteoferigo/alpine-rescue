import PowerNetworkContext from "@/contexts/power/lines";
import type { Coordinate } from "ol/coordinate";
import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import { createElement, useState, type PropsWithChildren } from "react";

const PowerNetworkProvider = ({ children }: PropsWithChildren) => {
  const [powerStation, setPowerStation] = useState<Coordinate>();
  const [powerPoles, setPowerPoles] = useState<Coordinate[][]>();
  const [powerLines, setPowerLines] = useState<Feature<Geometry>[]>();

  const value = {
    powerStation,
    setPowerStation,
    powerPoles,
    setPowerPoles,
    powerLines,
    setPowerLines,
  };

  return createElement(PowerNetworkContext.Provider, { value }, children);
};

export default PowerNetworkProvider;
