import { MapComponentProps } from "@/components/map/types";
import { OSPEDALE_CORTINA_PUTTI } from "@/const/nodes";
import { useMap } from "@/hooks/map";
import { useVectorLayer } from "@/hooks/map/layers/vector";
import { GraphNode } from "@/services/graph/types";
import { coordinateTransform } from "@/services/map/coordinate/transform";
import { createRouteFeatures } from "@/services/map/features/route";
import { createWayFeatures } from "@/services/map/features/way";
import {
  offroadPointStyle,
  pointStyle,
  trailheadPointStyle,
} from "@/services/map/layer/style/point";
import {
  offroadRouteStyle,
  roadRouteStyle,
  routeStyle,
} from "@/services/map/layer/style/route";
import { tracestrackTileLayer } from "@/services/map/layer/tracestrack";
import { createVectorSource } from "@/services/map/source/vector";
import { createNodeVectorSource } from "@/services/map/source/vector/node";
import { searchCloserRescuePoint } from "@/services/search/closer-rescue";
import { searchCloserTrail } from "@/services/search/closer-trail";
import { searchShorterPath } from "@/services/search/shorter-path";
import type Feature from "ol/Feature";
import type { Coordinate } from "ol/coordinate";
import type Geometry from "ol/geom/Geometry";
import "ol/ol.css";
import { useEffect, useRef, useState } from "react";

const MapComponent = ({ center, zoom }: MapComponentProps) => {
  const [processing, setProcessing] = useState(false);

  const [emergencyCoords, setEmercencyCoords] = useState<Coordinate>();
  const [offroadCoords, setOffroadCoords] = useState<Coordinate>();
  const [trailheadCoords, setTrailheadCoords] = useState<Coordinate>();
  const [rescueCoords, setRescueCoords] = useState<Coordinate>(
    OSPEDALE_CORTINA_PUTTI
  );

  const trailsGraph = useRef<GraphNode[]>();
  const [offroadPath, setOffroadPath] = useState<Feature<Geometry>[]>();
  const [trailPath, setTrailPath] = useState<Feature<Geometry>[]>();
  const [roadPath, setRoadPath] = useState<Feature<Geometry>[]>();

  // Definisco data-layer della mappa
  const emergencyPointLayer = useVectorLayer(pointStyle, 1);
  const offroadPointLayer = useVectorLayer(offroadPointStyle, 1);
  const trailheadPointLayer = useVectorLayer(trailheadPointStyle, 1);
  const rescuePointLayer = useVectorLayer(pointStyle, 1);
  const offroadRouteLayer = useVectorLayer(offroadRouteStyle);
  const trailRouteLayer = useVectorLayer(routeStyle);
  const roadRouteLayer = useVectorLayer(roadRouteStyle);
  // const routesLayer = useVectorLayer(routeOpaqueStyle);

  const resetGraph = () => {
    // Rimuovo i vecchi nodi dalla mappa
    offroadPointLayer.getSource()?.clear();
    trailheadPointLayer.getSource()?.clear();
    rescuePointLayer.getSource()?.clear();
    // Rimuovo le vecchie rotte dalla mappa
    offroadRouteLayer.getSource()?.clear();
    trailRouteLayer.getSource()?.clear();
    roadRouteLayer.getSource()?.clear();
  };

  // Impostazione della mappa
  const ref = useMap({
    center,
    zoom,
    layers: [
      tracestrackTileLayer,
      emergencyPointLayer,
      offroadPointLayer,
      trailheadPointLayer,
      rescuePointLayer,
      offroadRouteLayer,
      trailRouteLayer,
      roadRouteLayer,
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
        searchCloserTrail(emergencyCoords)
          .then((closerTrail) => {
            setOffroadCoords(closerTrail.offroadPoint);
            trailsGraph.current = closerTrail.trailsGraph;
          })
          .catch((error) => alert(error.message));
      }

      if (!rescueCoords) {
        // Cerco ospedale più vicino
        searchCloserRescuePoint(emergencyCoords)
          .then(setRescueCoords)
          .catch((error) => alert(error.message));
      }

      if (rescueCoords && offroadCoords) {
        // Calcolo il percorso più veloce
        searchShorterPath(rescueCoords, offroadCoords)
          .then(({ shorterPath }) => {
            // Definisco percorso fuori sentiero
            setOffroadPath(createWayFeatures([emergencyCoords, offroadCoords]));
            // Definisco sentiero
            setTrailheadCoords(shorterPath.trailheadPoint);
            setTrailPath(createRouteFeatures(shorterPath.trailDirections));
            // Definisco strata fino ad attacco sentiero
            setRoadPath(createRouteFeatures(shorterPath.roadDirections));
          })
          .catch((error) => alert(error.message))
          .finally(() => setProcessing(false));
      }
    }
  }, [emergencyCoords, rescueCoords, offroadCoords]);

  // Rappresento nodi e percorsi sulla mappa
  useEffect(() => {
    // Mostro nodi sulla mappa
    if (emergencyCoords)
      emergencyPointLayer.setSource(createNodeVectorSource(emergencyCoords));
    if (offroadCoords)
      offroadPointLayer.setSource(createNodeVectorSource(offroadCoords));
    if (trailheadCoords)
      trailheadPointLayer.setSource(createNodeVectorSource(trailheadCoords));
    if (rescueCoords)
      rescuePointLayer.setSource(createNodeVectorSource(rescueCoords));

    // Percorsi sulla mappa
    if (offroadPath)
      offroadRouteLayer.setSource(createVectorSource(offroadPath));
    if (trailPath) trailRouteLayer.setSource(createVectorSource(trailPath));
    if (roadPath) roadRouteLayer.setSource(createVectorSource(roadPath));
  }, [
    offroadRouteLayer,
    roadRouteLayer,
    emergencyCoords,
    rescueCoords,
    offroadPath,
    trailPath,
    offroadCoords,
    trailheadCoords,
    roadPath,
    emergencyPointLayer,
    offroadPointLayer,
    trailheadPointLayer,
    rescuePointLayer,
    trailRouteLayer,
  ]);

  return <div ref={ref} className="w-full h-screen" />;
};

export default MapComponent;
