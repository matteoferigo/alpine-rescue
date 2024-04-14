import type { Coordinate } from "ol/coordinate";

export type ElevationProfileProps = Partial<HTMLCanvasElement> & {
  nodes: Coordinate[];
};
