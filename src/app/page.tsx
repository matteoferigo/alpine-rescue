"use client";

import Map from "@/components/map";
import { MONTE_PIANO } from "@/const/nodes";
import { fromLonLat } from "ol/proj";

// Coordinate: [lng, lat]
const arrivalNode = fromLonLat(MONTE_PIANO);
const initialZoom = 16;

export default function Home() {
  return (
    <main>
      <Map center={arrivalNode} zoom={initialZoom} />
    </main>
  );
}
