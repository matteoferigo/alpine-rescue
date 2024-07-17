import type { LatLon } from "@/services/overpass/types/latlon";
import HELI_ELISOCCORSO_ALTO_ADIGE_MARKERS from "./heli.json";

const markers: LatLon[] = HELI_ELISOCCORSO_ALTO_ADIGE_MARKERS.map((marker) => ({
  lat: marker.lat,
  lon: marker.lng,
}));

export default markers;
