import type { Coordinate } from "ol/coordinate";
import { getBottomLeft, getTopRight } from "ol/extent";
import type Map from "ol/Map";
import { toLonLat } from "ol/proj";

export function getMapBoundingBox(map: Map): Coordinate[] {
  const extent = map.getView().calculateExtent(map.getSize());
  const [longWest, latSouth] = toLonLat(getBottomLeft(extent));
  const [longEast, latNorth] = toLonLat(getTopRight(extent));

  return [
    [latSouth, longWest],
    [latNorth, longEast],
  ];
}
