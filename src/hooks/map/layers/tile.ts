import TileLayer from "ol/layer/Tile";
import type TileSource from "ol/source/Tile";
import { useRef } from "react";

export const useTileLayer = (source: TileSource) => {
  const layer = useRef(new TileLayer({ source }));

  return layer.current;
};
