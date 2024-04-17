import type { Coordinate } from "ol/coordinate";

export type NodeGraph = Coordinate[][];

export type WeightedGraph = WeightedNode[][];

export type WeightedNode = {
  node: Coordinate;
  archs?: WeightedArch[];
};

export type WeightedArch = {
  fromNode: Coordinate;
  toNode: Coordinate;
  descending: boolean;
  distance: number;
  duration: number;
  elevation: number;
  slope: number;
  speed: number;
  terrain: string[];
};

export type WeightedPath = {
  distance: number;
  duration: number;
  nodes: Coordinate[];
  archs: WeightedArch[];
};
