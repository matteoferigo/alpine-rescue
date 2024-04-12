import type { Coordinate } from "ol/coordinate";

export function greatCircleBearing(
  origin: Coordinate,
  destination: Coordinate
): number {
  var toRad = Math.PI / 180;
  var ori = [origin[0] * toRad, origin[1] * toRad];
  var dest = [destination[0] * toRad, destination[1] * toRad];

  var bearing = Math.atan2(
    Math.sin(dest[0] - ori[0]) * Math.cos(dest[1]),
    Math.cos(ori[1]) * Math.sin(dest[1]) -
      Math.sin(ori[1]) * Math.cos(dest[1]) * Math.cos(dest[0] - ori[0])
  );
  return bearing;
}
