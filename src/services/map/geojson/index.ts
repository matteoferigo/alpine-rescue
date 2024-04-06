import GeoJSON from "ol/format/GeoJSON";

export const geojson = new GeoJSON({
  featureProjection: process.env.NEXT_PUBLIC_EPSG_PROJECTION_SRC,
  dataProjection: process.env.NEXT_PUBLIC_EPSG_PROJECTION_DST,
});
