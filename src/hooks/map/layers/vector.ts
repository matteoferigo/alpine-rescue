import VectorLayer from "ol/layer/Vector";
import type { StyleLike } from "ol/style/Style";
import { useRef } from "react";

export const useVectorLayer = (style: StyleLike, zIndex?: number) => {
  const layer = useRef(new VectorLayer({ style, zIndex }));

  return layer.current;
};
