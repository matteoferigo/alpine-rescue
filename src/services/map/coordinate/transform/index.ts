import type { Coordinate } from "ol/coordinate";
import { transform } from "ol/proj";

export const coordinateTransform = (coordinate: Coordinate) =>
  transform(
    coordinate,
    process.env.NEXT_PUBLIC_EPSG_PROJECTION_SRC,
    process.env.NEXT_PUBLIC_EPSG_PROJECTION_DST
  );
