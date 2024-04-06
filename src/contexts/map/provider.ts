import MapContext from "@/contexts/map";
import Map from "ol/Map";
import { createElement, useRef, type PropsWithChildren } from "react";

const MapProvider = ({ children }: PropsWithChildren) => {
  const map = useRef(new Map());
  const value = { map };

  return createElement(MapContext.Provider, { value }, children);
};

export default MapProvider;
