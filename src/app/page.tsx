"use client";

import Map from "@/components/map";
import { MONTE_PIANO } from "@/const/nodes";
import DriveRouteProvider from "@/contexts/route/drive/provider";
import HelicopterRouteProvider from "@/contexts/route/helicopter/provider";
import OffroadRouteProvider from "@/contexts/route/offroad/provider";
import { fromLonLat } from "ol/proj";

// Coordinate: [lng, lat]
const centerCoords = fromLonLat(MONTE_PIANO);
const initialZoom = 16;

export default function Home() {
  return (
    <main>
      <OffroadRouteProvider>
        <DriveRouteProvider>
          <HelicopterRouteProvider>
            <Map center={centerCoords} zoom={initialZoom} />
          </HelicopterRouteProvider>
        </DriveRouteProvider>
      </OffroadRouteProvider>
    </main>
  );
}
