import type { MapComponentProps } from "@/components/map/types";
import { FEATURE_TYPE_NAME, POWER_POLE_FEATURE_TYPE } from "@/const/types";
import { usePowerNetworkContext } from "@/contexts/power/lines/hooks";
import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useOffroadRouteContext } from "@/contexts/route/offroad/hooks";
import { useMap } from "@/hooks/map";
import { useVectorLayer } from "@/hooks/map/layers/vector";
import { useFindDriveRoute } from "@/hooks/route/find/drive";
import { useFindOffroadRoute } from "@/hooks/route/find/offroad";
import { useFindPowerLines } from "@/hooks/route/find/power/line/find";
import { useFindCloserPowerStation } from "@/hooks/route/find/power/station/find";
import { coordinateTransform } from "@/services/map/coordinate/transform";
import { getMapEventFeatureHit } from "@/services/map/event/hits/feature";
import { getFeatureCoordinates } from "@/services/map/features/coordinates";
import { createNodeFeatures } from "@/services/map/features/node";
import { setFeaturesStyle } from "@/services/map/features/style";
import { createWayFeatures } from "@/services/map/features/way";
import {
  offroadNodeStyle,
  offroadPointStyle,
  pointStyle,
  trailheadPointStyle,
} from "@/services/map/layer/style/point";
import {
  powerLineStyle,
  powerPylonStyle,
} from "@/services/map/layer/style/power";
import {
  offroadRouteStyle,
  roadRouteStyle,
  routeStyle,
} from "@/services/map/layer/style/route";
import { thunderforestLandscapeTileLayer } from "@/services/map/layer/thunderforest/landscape";
import { createVectorSource } from "@/services/map/source/vector";
import { getMapBoundingBox } from "@/services/ol/map-bbox";
import type { Feature } from "ol";
import type { Geometry } from "ol/geom";
import "ol/ol.css";
import { useEffect, useState } from "react";

const MapComponent = ({
  center,
  zoom,
  searching,
  showABidirectional,
  showDriveRoute,
  onSearchStart,
  onSearchEnd,
}: MapComponentProps) => {
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const {
    destinationCoords,
    trailEndCoords,
    // offroadGraph,
    offroadNodesAStandard,
    offroadNodesABidirectional,
  } = useOffroadRouteContext();
  const {
    trailheadCoords,
    // departureCoords,
    trailPath: driveTrailPath,
    roadPath,
  } = useDriveRouteContext();
  // const {
  //   heliportCoords,
  //   helipadCoords,
  //   trailPath: helicopterTrailPath,
  //   flightPath,
  // } = useHelicopterRouteContext();
  const {
    powerStation: departureCoords,
    powerPoles,
    powerLines,
  } = usePowerNetworkContext();

  const findOffroadRoute = useFindOffroadRoute();
  // const findCloserHospital = useFindCloserHospital();
  const findDriveRoute = useFindDriveRoute();
  // const findHelicopterRoute = useFindHelicopterRoute();

  const showPowerNetwork = powerPoles != null && powerLines != null;
  const findPowerLines = useFindPowerLines();
  const findCloserPowerStation = useFindCloserPowerStation();

  // const loadCurrentWeather = useLoadCurrentWeather();

  // Definisco data-layer della mappa
  const nodesLayer = useVectorLayer(pointStyle, 10);
  const routesLayer = useVectorLayer(routeStyle, 5);
  const graphLayer = useVectorLayer(offroadNodeStyle);
  const powerPolesLayer = useVectorLayer(powerPylonStyle);
  const powerLinesLayer = useVectorLayer(powerLineStyle);

  // Impostazione della mappa
  const ref = useMap({
    center,
    zoom,
    layers: [
      thunderforestLandscapeTileLayer,
      nodesLayer,
      routesLayer,
      graphLayer,
      powerPolesLayer,
      powerLinesLayer,
    ],
    onClick(e) {
      // Consento la ricerca solo su specifici elementi
      const hitPowerPole = getMapEventFeatureHit(
        e,
        FEATURE_TYPE_NAME,
        POWER_POLE_FEATURE_TYPE
      );

      // Avvio il processo
      if (searching || hitPowerPole == null) return;
      onSearchStart();

      // Ripristino mappa
      nodesLayer.getSource()?.clear();
      routesLayer.getSource()?.clear();
      graphLayer.getSource()?.clear();

      // Assegno luogo dell'emergenza da raggiungere (in parallelo)
      // const emergencyCoords = coordinateTransform(e.coordinate);
      const emergencyCoords = coordinateTransform(
        getFeatureCoordinates(hitPowerPole)!
      );
      Promise.all([
        findOffroadRoute(emergencyCoords),
        // findCloserHospital(emergencyCoords),
        // loadCurrentWeather(emergencyCoords),
        findCloserPowerStation(emergencyCoords),
      ])
        .then(([trailEndCoords, powerStationCoords]) =>
          Promise.all([
            findDriveRoute(powerStationCoords!, trailEndCoords!),
            // findHelicopterRoute(hospitalCoords!, trailEndCoords!, weather),
          ])
        )
        .finally(() => {
          onSearchEnd();
        });
    },
    onMoveEnd(e) {
      // Aggiorno valore zoom
      const newZoom = Math.ceil(e.map.getView().getZoom()!);
      setCurrentZoom(newZoom);

      // Popola rete elettrica
      const bbox = getMapBoundingBox(e.map);
      findPowerLines(bbox, newZoom < 10 ? 500 : undefined);
    },
    onMouseMove(e) {
      // Mostro puntatore se sto selezionando un elemento
      const hitPowerPole = getMapEventFeatureHit(
        e,
        FEATURE_TYPE_NAME,
        POWER_POLE_FEATURE_TYPE
      );
      e.map.getTargetElement().style.cursor = !!hitPowerPole ? "pointer" : "";
    },
  });

  // Rappresento nodi e percorsi sulla mappa
  useEffect(() => {
    if (!searching) {
      const showFlightRoute = !showDriveRoute;
      const showAStar = !showABidirectional;
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
      if (showDriveRoute && trailheadCoords) {
        nodesFeatures.push(
          ...setFeaturesStyle(
            createNodeFeatures(trailheadCoords),
            trailheadPointStyle
          )
        );
      }
      // if (showFlightRoute && heliportCoords) {
      //   nodesFeatures.push(
      //     ...setFeaturesStyle(
      //       createNodeFeatures(heliportCoords),
      //       heliportPointStyle
      //     )
      //   );
      // }
      // if (showFlightRoute && helipadCoords) {
      //   nodesFeatures.push(
      //     ...setFeaturesStyle(
      //       createNodeFeatures(helipadCoords),
      //       helipadPointStyle
      //     )
      //   );
      // }
      nodesLayer.setSource(createVectorSource(nodesFeatures));

      // Percorsi sulla mappa
      const routesFeatures = [];
      // Switch offroad nodes showABidirectional
      if (offroadNodesAStandard && showAStar) {
        routesFeatures.push(
          ...setFeaturesStyle(
            createWayFeatures(offroadNodesAStandard),
            offroadRouteStyle
          )
        );
      }
      if (offroadNodesABidirectional && showABidirectional) {
        routesFeatures.push(
          ...setFeaturesStyle(
            createWayFeatures(offroadNodesABidirectional),
            offroadRouteStyle
          )
        );
      }
      if (showDriveRoute && driveTrailPath) {
        routesFeatures.push(...setFeaturesStyle(driveTrailPath, routeStyle));
      }
      // if (showFlightRoute && helicopterTrailPath) {
      //   routesFeatures.push(
      //     ...setFeaturesStyle(helicopterTrailPath, routeStyle)
      //   );
      // }
      if (showDriveRoute && roadPath) {
        routesFeatures.push(...setFeaturesStyle(roadPath, roadRouteStyle));
      }
      // if (showFlightRoute && flightPath) {
      //   routesFeatures.push(...setFeaturesStyle(flightPath, flightRouteStyle));
      // }
      routesLayer.setSource(createVectorSource(routesFeatures));

      // Grafi sulla mappa
      // const graphFeatures: Feature<Geometry>[] = [];
      // if (offroadGraph) {
      //   offroadGraph.forEach((offroadLevel) => {
      //     offroadLevel.forEach((alternativeNodeCoords) => {
      //       graphFeatures.push(...createNodeFeatures(alternativeNodeCoords));
      //     });
      //   });
      // }
      // graphLayer.setSource(createVectorSource(graphFeatures));

      // Rete elettrica
      if (showPowerNetwork) {
        const showPathNodes = currentZoom < 15;

        // Ripristino mappa
        powerPolesLayer.getSource()?.clear();
        powerLinesLayer.getSource()?.clear();

        // Aggiungo nuovi elementi
        if (powerPoles) {
          const powerElements: Feature<Geometry>[] = [];
          powerPoles.forEach((nodes) => {
            const nodesToDisplay = showPathNodes
              ? [nodes[0], nodes[nodes.length - 1]]
              : nodes;
            nodesToDisplay.forEach((coords) =>
              powerElements.push(
                ...createNodeFeatures(coords, {
                  [FEATURE_TYPE_NAME]: POWER_POLE_FEATURE_TYPE,
                })
              )
            );
          });
          powerPolesLayer.setSource(createVectorSource(powerElements));
        }
        if (powerLines) {
          powerLinesLayer.setSource(createVectorSource(powerLines));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searching, showDriveRoute, showABidirectional, powerPoles, powerLines]);

  return <div ref={ref} className="w-full flex-1 md:h-screen" />;
};

export default MapComponent;
