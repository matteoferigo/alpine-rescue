import type Feature from "ol/Feature";
import SimpleGeometry from "ol/geom/SimpleGeometry";

export function getFeatureCoordinates(feature: Feature) {
  const geometry = feature.getGeometry();

  if (geometry instanceof SimpleGeometry) {
    return geometry.getCoordinates();
  }
  return null;
}
