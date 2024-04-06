import type Map from "ol/Map";
import type { MutableRefObject } from "react";

export type MapContextValue = {
  map: MutableRefObject<Map> | undefined;
};
