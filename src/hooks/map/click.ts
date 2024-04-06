import { useMapInstance } from "@/hooks/map/instance";
import type MapBrowserEvent from "ol/MapBrowserEvent";
import { ListenerFunction } from "ol/events";
import { DependencyList, useCallback, useEffect } from "react";

type MapClickCallback = (event: MapBrowserEvent<any>) => void;

export const useMapClickCallback = (
  callback: MapClickCallback,
  deps: DependencyList
) => {
  const map = useMapInstance();
  const onClick = useCallback(callback as ListenerFunction, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    map?.addEventListener("click", onClick);

    return () => map?.removeEventListener("click", onClick);
  }, [map, onClick]);
};
