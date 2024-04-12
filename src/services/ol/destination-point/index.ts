import type { Coordinate } from "ol/coordinate";

export function computeDestinationPoint(
  origin: Coordinate,
  distance: number,
  bearing: number
): Coordinate {
  var toRad = Math.PI / 180;
  var radius = 6371008.8;

  var phi1 = origin[1] * toRad;
  var lambda1 = origin[0] * toRad;
  var delta = distance / radius;

  var phi2 = Math.asin(
    Math.sin(phi1) * Math.cos(delta) +
      Math.cos(phi1) * Math.sin(delta) * Math.cos(bearing)
  );

  var lambda2 =
    lambda1 +
    Math.atan2(
      Math.sin(bearing) * Math.sin(delta) * Math.cos(phi1),
      Math.cos(delta) - Math.sin(phi1) * Math.sin(phi2)
    );

  var lon = lambda2 / toRad;
  // normalise to >=-180 and <=180°
  if (lon < -180 || lon > 180) {
    lon = ((lon * 540) % 360) - 180;
  }

  return [lon, phi2 / toRad];
}
