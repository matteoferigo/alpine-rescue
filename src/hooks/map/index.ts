// import apply from "ol-mapbox-style";
import Map from "ol/Map";
import type MapBrowserEvent from "ol/MapBrowserEvent";
import type MapEvent from "ol/MapEvent";
import View from "ol/View";
import type { Coordinate } from "ol/coordinate";
import type { ListenerFunction } from "ol/events";
import type BaseLayer from "ol/layer/Base";
import { useEffect, useRef } from "react";

type MapHookOptions = {
  center: Coordinate;
  zoom: number;
  layers: BaseLayer[];
  onClick?(event: MapBrowserEvent<any>): void;
  onMoveEnd?(event: MapEvent): void;
  onReady?(event: MapEvent): void;
  onMouseMove?(event: MapBrowserEvent<any>): void;
};

export const useMap = ({
  center,
  zoom,
  layers,
  onClick,
  onMoveEnd,
  onReady,
  onMouseMove,
}: MapHookOptions) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Instanzio la mappa
    const map = new Map({
      target: ref.current!,
      view: new View({ center, zoom }),
      layers,
    });

    // Uso mappa ArcGis
    // const basemapId = "arcgis/outdoor";
    // apply(map, `api/arcgis/styles/${basemapId}`);

    // Aggiungo gli event listener
    if (onClick) map.addEventListener("click", onClick as ListenerFunction);
    if (onMoveEnd)
      map.addEventListener("moveend", onMoveEnd as ListenerFunction);
    if (onMouseMove)
      map.addEventListener("pointermove", onMouseMove as ListenerFunction);
    if (onReady) map.addEventListener("loadend", onReady as ListenerFunction);

    // Rimuovo i listener
    return () => {
      map.setTarget(undefined);
      if (onClick)
        map.removeEventListener("click", onClick as ListenerFunction);
      if (onMoveEnd)
        map.removeEventListener("moveend", onMoveEnd as ListenerFunction);
      if (onMouseMove)
        map.removeEventListener("pointermove", onMouseMove as ListenerFunction);
      if (onReady)
        map.removeEventListener("loadend", onReady as ListenerFunction);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return ref;
};
