import type { GeomOutput } from "@/services/overpass/types/geom";
import { getCloserNode } from "@/services/path/closer-node";
import type { GeomElementWithDistance } from "@/services/path/types";
import type { Coordinate } from "ol/coordinate";

export const getCloserWay = (ways: GeomOutput[], node: Coordinate) => {
  return ways.reduce((acc: GeomElementWithDistance | null, way) => {
    const closerNode = getCloserNode(way.geometry, node);

    return acc == null || closerNode.distance < acc.closerNode.distance
      ? { ...way, closerNode }
      : acc;
  }, null) as GeomElementWithDistance;
};
