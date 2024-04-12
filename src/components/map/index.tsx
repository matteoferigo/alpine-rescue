import { MapComponentProps } from "@/components/map/types";
import { OSPEDALE_CORTINA_PUTTI } from "@/const/nodes";
import { useMap } from "@/hooks/map";
import { useVectorLayer } from "@/hooks/map/layers/vector";
import { coordinateTransform } from "@/services/map/coordinate/transform";
import { createRouteFeatures } from "@/services/map/features/route";
import { createWayFeatures } from "@/services/map/features/way";
import {
  helipadPointStyle,
  offroadNodeStyle,
  offroadPointStyle,
  pointStyle,
  trailheadPointStyle,
} from "@/services/map/layer/style/point";
import {
  flightRouteStyle,
  offroadOpaqueStyle,
  offroadRouteStyle,
  roadRouteStyle,
  routeStyle,
} from "@/services/map/layer/style/route";
import { thunderforestLandscapeTileLayer } from "@/services/map/layer/thunderforest/landscape";
import { createVectorSource } from "@/services/map/source/vector";
import { createNodeVectorSource } from "@/services/map/source/vector/node";
import { searchCloserHelipadPoint } from "@/services/search/closer-helipad";
import { searchCloserRescuePoint } from "@/services/search/closer-rescue";
import { searchShorterOffroad } from "@/services/search/shorter-offroad";
import { searchShorterRoute } from "@/services/search/shorter-route";
import type Feature from "ol/Feature";
import type { Coordinate } from "ol/coordinate";
import type Geometry from "ol/geom/Geometry";
import "ol/ol.css";
import { useEffect, useState } from "react";

const MapComponent = ({ center, zoom }: MapComponentProps) => {
  const [processing, setProcessing] = useState(false);

  const [emergencyCoords, setEmercencyCoords] = useState<Coordinate>();
  const [offroadCoords, setOffroadCoords] = useState<Coordinate>();
  const [trailheadCoords, setTrailheadCoords] = useState<Coordinate>();
  const [helipadCoords, setHelipadCoords] = useState<Coordinate>();
  const [rescueCoords, setRescueCoords] = useState<Coordinate>(
    OSPEDALE_CORTINA_PUTTI
  );

  const [offroadPath, setOffroadPath] = useState<Feature<Geometry>[]>();
  const [trailPath, setTrailPath] = useState<Feature<Geometry>[]>();
  const [roadPath, setRoadPath] = useState<Feature<Geometry>[]>();
  const [flightPath, setFlightPath] = useState<Feature<Geometry>[]>();

  // Definisco data-layer della mappa
  const emergencyPointLayer = useVectorLayer(pointStyle, 1);
  const offroadPointLayer = useVectorLayer(offroadPointStyle, 1);
  const trailheadPointLayer = useVectorLayer(trailheadPointStyle, 1);
  const helipadPointLayer = useVectorLayer(helipadPointStyle, 1);
  const rescuePointLayer = useVectorLayer(pointStyle, 1);
  const offroadRouteLayer = useVectorLayer(offroadRouteStyle);
  const trailRouteLayer = useVectorLayer(routeStyle);
  const roadRouteLayer = useVectorLayer(roadRouteStyle);
  const flightRouteLayer = useVectorLayer(flightRouteStyle);

  // TODO: Verifico i dati
  const offroadNodesLayer = useVectorLayer(offroadNodeStyle);
  const offroadWaysLayer = useVectorLayer(offroadOpaqueStyle);
  const offroadGraphLayer = useVectorLayer(offroadNodeStyle);

  const resetGraph = () => {
    // Rimuovo i vecchi nodi dalla mappa
    offroadPointLayer.getSource()?.clear();
    trailheadPointLayer.getSource()?.clear();
    helipadPointLayer.getSource()?.clear();
    rescuePointLayer.getSource()?.clear();
    // Rimuovo le vecchie rotte dalla mappa
    offroadRouteLayer.getSource()?.clear();
    trailRouteLayer.getSource()?.clear();
    roadRouteLayer.getSource()?.clear();
    flightRouteLayer.getSource()?.clear();
  };

  // Impostazione della mappa
  const ref = useMap({
    center,
    zoom,
    layers: [
      thunderforestLandscapeTileLayer,
      emergencyPointLayer,
      offroadPointLayer,
      trailheadPointLayer,
      helipadPointLayer,
      rescuePointLayer,
      offroadRouteLayer,
      trailRouteLayer,
      roadRouteLayer,
      flightRouteLayer,

      // TODO: Verifico i dati
      offroadNodesLayer,
      offroadWaysLayer,
      offroadGraphLayer,
    ],
    onClick(e) {
      if (processing) return;
      // Ripristino la mappa
      resetGraph();
      // Assegno luogo dell'emergenza da raggiungere
      setEmercencyCoords(coordinateTransform(e.coordinate));
    },
  });

  // Quando seleziono luogo dell'emergenza
  useEffect(() => {
    if (emergencyCoords) {
      setProcessing(true);

      // Recupero punti di partenza e di fine
      if (!offroadCoords) {
        // Cerco sentiero più vicino
        searchShorterOffroad(emergencyCoords, 500)
          .then((offroadPaths) => {
            const closerTrail = offroadPaths[0];
            // Assengo punto di fine sentiero
            setOffroadCoords(closerTrail.nodes[0]);
            // Definisco percorso fuori sentiero
            setOffroadPath(
              createWayFeatures([...closerTrail.nodes, emergencyCoords])
            );

            // TODO: Verifico i dati
            // offroadNodesLayer.setSource(
            //   createNodesVectorSource(
            //     closerTrail.graph.reduce((acc, nodes) => [...acc, ...nodes], [])
            //   )
            // );
            // offroadWaysLayer.setSource(
            //   createWaysVectorSource(offroadPaths.map((path) => path.nodes))
            // );
            // offroadGraphLayer.setSource(
            //   createNodesVectorSource(closerTrail.graph)
            // );
          })
          .catch((error) => alert(error.message));
      }

      if (!rescueCoords) {
        // Cerco ospedale più vicino
        searchCloserRescuePoint(emergencyCoords)
          .then(setRescueCoords)
          .catch((error) => alert(error.message));
      }

      // Cerco il percorso via terra
      if (rescueCoords && offroadCoords) {
        // Calcolo il percorso più veloce
        searchShorterRoute(rescueCoords, offroadCoords)
          .then(({ shorterPath }) => {
            // Definisco sentiero
            setTrailheadCoords(shorterPath.trailheadPoint);
            setTrailPath(createRouteFeatures(shorterPath.trailDirections));
            // Definisco strata fino ad attacco sentiero
            setRoadPath(createRouteFeatures(shorterPath.roadDirections));
          })
          .catch((error) => alert(error.message))
          .finally(() => setProcessing(false));
      }

      // Cerco il percorso via elicottero
      if (rescueCoords && offroadCoords) {
        // Cerco elisuperfici vicine
        searchCloserHelipadPoint(offroadCoords)
          .then((helipadNode) => {
            // Definisco volo
            setHelipadCoords(helipadNode);
            setFlightPath(createWayFeatures([rescueCoords, helipadNode]));
          })
          .catch((error) => alert(error.message));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emergencyCoords, rescueCoords, offroadCoords]);

  // Rappresento nodi e percorsi sulla mappa
  useEffect(() => {
    // Mostro nodi sulla mappa
    if (emergencyCoords)
      emergencyPointLayer.setSource(createNodeVectorSource(emergencyCoords));
    if (rescueCoords)
      rescuePointLayer.setSource(createNodeVectorSource(rescueCoords));
    if (offroadCoords)
      offroadPointLayer.setSource(createNodeVectorSource(offroadCoords));
    if (trailheadCoords)
      trailheadPointLayer.setSource(createNodeVectorSource(trailheadCoords));
    if (helipadCoords)
      helipadPointLayer.setSource(createNodeVectorSource(helipadCoords));

    // Percorsi sulla mappa
    if (offroadPath)
      offroadRouteLayer.setSource(createVectorSource(offroadPath));
    if (trailPath) trailRouteLayer.setSource(createVectorSource(trailPath));
    if (roadPath) roadRouteLayer.setSource(createVectorSource(roadPath));
    if (flightPath) flightRouteLayer.setSource(createVectorSource(flightPath));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    emergencyCoords,
    rescueCoords,
    offroadCoords,
    trailheadCoords,
    helipadCoords,
    offroadPath,
    trailPath,
    roadPath,
    flightPath,
  ]);

  return <div ref={ref} className="w-full h-screen" />;
};

export default MapComponent;
