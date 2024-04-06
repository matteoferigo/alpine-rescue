import WebGLTile from "ol/layer/WebGLTile";
import XYZ from "ol/source/XYZ";

export const tracestrackTileLayer = new WebGLTile({
  source: new XYZ({
    attributions: [
      'Data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://viewfinderpanoramas.org/">SRTM</a>, <a href="https://portal.opentopography.org/datasetMetadata?otCollectionID=OT.032021.4326.2">NASADEM</a>, <a href="https://worldcover2021.esa.int">ESA WorldCover</a>; Maps © <a href="https://www.tracestrack.com/">Tracestrack</a>',
    ],
    opaque: true,
    cacheSize: 200,
    transition: 400,
    urls: ["/api/tracestrack/topo_it/{z}/{x}/{y}.png"],
  }),
});
