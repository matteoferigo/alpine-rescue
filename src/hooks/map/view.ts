import { useMapInstance } from "@/hooks/map/instance";
import View from "ol/View";
import type { Coordinate } from "ol/coordinate";
import { useEffect } from "react";

export const useMapView = (center: Coordinate, zoom: number) => {
  const map = useMapInstance();

  useEffect(() => {
    map?.setView(new View({ center, zoom }));
  }, [map, center, zoom]);
};
