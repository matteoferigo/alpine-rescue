import Feature from "ol/Feature";
import Geometry from "ol/geom/Geometry";
import VectorSource from "ol/source/Vector";

export const createVectorSource = (features: Feature<Geometry>[]) => {
  return new VectorSource({ features });
};
