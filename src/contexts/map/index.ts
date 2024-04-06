import type { MapContextValue } from "@/contexts/map/types";
import { createContext } from "react";

const MapContext = createContext<Partial<MapContextValue>>({
  map: undefined,
});

export default MapContext;
