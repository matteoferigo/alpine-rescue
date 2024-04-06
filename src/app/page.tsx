"use client";

import Map from "@/components/map";
import { PALA_NORDEST } from "@/const/nodes";
import { fromLonLat } from "ol/proj";

// Coordinate: [lng, lat]
const arrivalNode = fromLonLat(PALA_NORDEST);
const initialZoom = 16;

export default function Home() {
  return (
    <main>
      <Map center={arrivalNode} zoom={initialZoom} />
    </main>
  );
}
