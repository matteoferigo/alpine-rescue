import MapContext from "@/contexts/map";
import type { MapContextValue } from "@/contexts/map/types";
import { useContext } from "react";

export const useMapContext = () => useContext(MapContext) as MapContextValue;
