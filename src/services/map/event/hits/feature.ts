import type MapBrowserEvent from "ol/MapBrowserEvent";

export function getMapEventFeatureHit(
  event: MapBrowserEvent<any>,
  featurePropertyKey: string,
  featurePropertyName: string
) {
  const { map, pixel } = event;
  // const pixel = e.map.getEventPixel(e.originalEvent);
  const hit = map.hasFeatureAtPixel(pixel);
  if (!hit) return null;

  let featureHit = null;
  map.forEachFeatureAtPixel(pixel, (feature) => {
    if (feature.get(featurePropertyKey) === featurePropertyName) {
      featureHit = feature;
    }
  });
  return featureHit;
}
