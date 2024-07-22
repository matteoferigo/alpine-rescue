"use client";

import HamburgerButton from "@/components/close-button";
import Map from "@/components/map";
import Spinner from "@/components/spinner";
import SummaryComponent from "@/components/summary";
import WeatherSummary from "@/components/summary/weather";
import { SPIEZ } from "@/const/nodes";
import PowerNetworkProvider from "@/contexts/power/lines/provider";
import DriveRouteProvider from "@/contexts/route/drive/provider";
import HelicopterRouteProvider from "@/contexts/route/helicopter/provider";
import OffroadRouteProvider from "@/contexts/route/offroad/provider";
import WeatherProvider from "@/contexts/weather/provider";
import { fromLonLat } from "ol/proj";
import { useState } from "react";

// Coordinate: [lng, lat]
// const centerCoords = fromLonLat(POWER_LINE_FRANCE);
// const initialZoom = 16;
const centerCoords = fromLonLat(SPIEZ);
const initialZoom = 10;

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
  const [showABidirectional, setShowABidirectional] = useState(false);
  // const [showDriveRoute, setShowDriveRoute] = useState(false);
  const showDriveRoute = true;
  const setShowDriveRoute = () =>
    console.warn("Non si può cambiare la modalità di trasporto");

  return (
    <main>
      {searching && (
        <div className="fixed w-full h-full flex justify-center items-center bg-slate-500 opacity-50 z-10">
          <Spinner />
        </div>
      )}
      <WeatherProvider>
        <PowerNetworkProvider>
          <OffroadRouteProvider>
            <DriveRouteProvider>
              <HelicopterRouteProvider>
                <div className="flex flex-col md:flex-row w-screen h-screen">
                  <Map
                    center={centerCoords}
                    zoom={initialZoom}
                    searching={searching}
                    onSearchStart={onSearchStart}
                    onSearchEnd={onSearchEnd}
                    showABidirectional={showABidirectional}
                    showDriveRoute={showDriveRoute}
                  />
                  <SummaryComponent
                    open={showResults}
                    showABidirectional={showABidirectional}
                    setShowABidirectional={setShowABidirectional}
                    showDriveRoute={showDriveRoute}
                    setShowDriveRoute={setShowDriveRoute}
                  />
                  <div className="absolute top-2 right-2 md:top-4 md:right-6">
                    <HamburgerButton
                      open={showResults}
                      onClick={() => setShowResults((prev) => !prev)}
                    />
                  </div>
                </div>
                <WeatherSummary />
              </HelicopterRouteProvider>
            </DriveRouteProvider>
          </OffroadRouteProvider>
        </PowerNetworkProvider>
      </WeatherProvider>
    </main>
  );
}
