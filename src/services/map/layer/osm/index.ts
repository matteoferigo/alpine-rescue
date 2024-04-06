import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export const osmTileLayer = new TileLayer({
  source: new OSM(),
});
