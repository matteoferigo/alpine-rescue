import type Feature from "ol/Feature";
import type Geometry from "ol/geom/Geometry";
import type { Style } from "ol/style";

export const setFeaturesStyle = (
  features: Feature<Geometry>[],
  style: Style
) => {
  features.forEach((feature) => feature.setStyle(style));
  return features;
};
