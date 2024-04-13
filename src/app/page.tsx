"use client";

import Map from "@/components/map";
import Spinner from "@/components/spinner";
import SummaryComponent from "@/components/summary";
import { PALA_NORDEST } from "@/const/nodes";
import DriveRouteProvider from "@/contexts/route/drive/provider";
import HelicopterRouteProvider from "@/contexts/route/helicopter/provider";
import OffroadRouteProvider from "@/contexts/route/offroad/provider";
import { fromLonLat } from "ol/proj";
import { useState } from "react";

// Coordinate: [lng, lat]
const centerCoords = fromLonLat(PALA_NORDEST);
const initialZoom = 16;

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [searching, setSearching] = useState(false);
  const onSearchStart = () => {
    setShowResults(false);
    setSearching(true);
  };
  const onSearchEnd = () => {
    setShowResults(true);
    setSearching(false);
  };

  return (
    <main>
      {searching && (
        <div className="fixed w-full h-full flex justify-center items-center bg-slate-500 opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <OffroadRouteProvider>
        <DriveRouteProvider>
          <HelicopterRouteProvider>
            <Map
              center={centerCoords}
              zoom={initialZoom}
              searching={searching}
              onSearchStart={onSearchStart}
              onSearchEnd={onSearchEnd}
            />
            <SummaryComponent open={showResults} />
          </HelicopterRouteProvider>
        </DriveRouteProvider>
      </OffroadRouteProvider>
    </main>
  );
}
