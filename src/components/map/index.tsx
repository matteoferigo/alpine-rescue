import type { MapComponentProps } from "@/components/map/types";
import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useHelicopterRouteContext } from "@/contexts/route/helicopter/hooks";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { useMap } from "@/hooks/map";
import { useVectorLayer } from "@/hooks/map/layers/vector";
import { useFindDriveRoute } from "@/hooks/route/find/drive";
import { useFindHelicopterRoute } from "@/hooks/route/find/helicopter";
import { useFindCloserHospital } from "@/hooks/route/find/hospital";
import { useFindOffroadRoute } from "@/hooks/route/find/offroad";
import { useLoadCurrentWeather } from "@/hooks/weather/current";
import { coordinateTransform } from "@/services/map/coordinate/transform";
import { createNodeFeatures } from "@/services/map/features/node";
import { setFeaturesStyle } from "@/services/map/features/style";
import { createWayFeatures } from "@/services/map/features/way";
import {
  helipadPointStyle,
  heliportPointStyle,
  offroadNodeStyle,
  offroadPointStyle,
  pointStyle,
  trailheadPointStyle,
} from "@/services/map/layer/style/point";
import {
  flightRouteStyle,
  offroadRouteStyle,
  roadRouteStyle,
  routeStyle,
} from "@/services/map/layer/style/route";
import { thunderforestCycleTileLayer } from "@/services/map/layer/thunderforest/cycle";
import { createVectorSource } from "@/services/map/source/vector";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";
import "ol/ol.css";
import { useEffect } from "react";

const MapComponent = ({
  center,
  zoom,
  searching,
  onSearchStart,
  onSearchEnd,
}: MapComponentProps) => {
  const { destinationCoords, trailEndCoords, offroadNodes, offroadGraph } =
    useOffroadRouteContext();
  const {
    trailheadCoords,
    departureCoords,
    trailPath: driveTrailPath,
    roadPath,
  } = useDriveRouteContext();
  const {
    heliportCoords,
    helipadCoords,
    trailPath: helicopterTrailPath,
    flightPath,
  } = useHelicopterRouteContext();

  const findOffroadRoute = useFindOffroadRoute();
  const findCloserHospital = useFindCloserHospital();
  const findDriveRoute = useFindDriveRoute();
  const findHelicopterRoute = useFindHelicopterRoute();

  const loadCurrentWeather = useLoadCurrentWeather();

  // Definisco data-layer della mappa
  const nodesLayer = useVectorLayer(pointStyle, 10);
  const routesLayer = useVectorLayer(routeStyle, 5);
  const graphLayer = useVectorLayer(offroadNodeStyle);

  // Impostazione della mappa
  const ref = useMap({
    center,
    zoom,
    layers: [thunderforestCycleTileLayer, nodesLayer, routesLayer, graphLayer],
    onClick(e) {
      // Avvio il processo
      if (searching) return;
      onSearchStart();

      // Ripristino mappa
      nodesLayer.getSource()?.clear();
      routesLayer.getSource()?.clear();
      graphLayer.getSource()?.clear();

      // Assegno luogo dell'emergenza da raggiungere (in parallelo)
      const emergencyCoords = coordinateTransform(e.coordinate);
      Promise.all([
        findOffroadRoute(emergencyCoords),
        findCloserHospital(emergencyCoords),
        loadCurrentWeather(emergencyCoords),
      ])
        .then(([trailEndCoords, hospitalCoords, weather]) =>
          Promise.all([
            findDriveRoute(hospitalCoords!, trailEndCoords!),
            findHelicopterRoute(hospitalCoords!, trailEndCoords!, weather),
          ])
        )
        .finally(() => {
          onSearchEnd();
        });
    },
  });

  // Rappresento nodi e percorsi sulla mappa
  useEffect(() => {
    if (!searching) {
      // Mostro nodi sulla mappa
      const nodesFeatures = [];
      if (destinationCoords) {
        nodesFeatures.push(...createNodeFeatures(destinationCoords));
      }
      if (departureCoords) {
        nodesFeatures.push(...createNodeFeatures(departureCoords));
      }
      if (trailEndCoords) {
        nodesFeatures.push(
          ...setFeaturesStyle(
            createNodeFeatures(trailEndCoords),
            offroadPointStyle
          )
        );
      }
      if (trailheadCoords) {
        nodesFeatures.push(
          ...setFeaturesStyle(
            createNodeFeatures(trailheadCoords),
            trailheadPointStyle
          )
        );
      }
      if (heliportCoords) {
        nodesFeatures.push(
          ...setFeaturesStyle(
            createNodeFeatures(heliportCoords),
            heliportPointStyle
          )
        );
      }
      if (helipadCoords) {
        nodesFeatures.push(
          ...setFeaturesStyle(
            createNodeFeatures(helipadCoords),
            helipadPointStyle
          )
        );
      }
      nodesLayer.setSource(createVectorSource(nodesFeatures));

      // Percorsi sulla mappa
      const routesFeatures = [];
      if (offroadNodes) {
        routesFeatures.push(
          ...setFeaturesStyle(
            createWayFeatures(offroadNodes),
            offroadRouteStyle
          )
        );
      }
      if (driveTrailPath) {
        routesFeatures.push(...setFeaturesStyle(driveTrailPath, routeStyle));
      }
      if (helicopterTrailPath) {
        routesFeatures.push(
          ...setFeaturesStyle(helicopterTrailPath, routeStyle)
        );
      }
      if (roadPath) {
        routesFeatures.push(...setFeaturesStyle(roadPath, roadRouteStyle));
      }
      if (flightPath) {
        routesFeatures.push(...setFeaturesStyle(flightPath, flightRouteStyle));
      }
      routesLayer.setSource(createVectorSource(routesFeatures));

      // Grafi sulla mappa
      const graphFeatures: Feature<Geometry>[] = [];
      if (offroadGraph) {
        offroadGraph.forEach((offroadLevel) => {
          offroadLevel.forEach((alternativeNodeCoords) => {
            graphFeatures.push(...createNodeFeatures(alternativeNodeCoords));
          });
        });
      }
      graphLayer.setSource(createVectorSource(graphFeatures));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching]);

  return <div ref={ref} className="w-full flex-1 md:h-screen" />;
};

export default MapComponent;
