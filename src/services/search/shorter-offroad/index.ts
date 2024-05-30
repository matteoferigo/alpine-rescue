import { OFFROAD_NODES_BREADTH, OFFROAD_NODES_DISTANCE } from "@/const/offroad";
import { getElevations } from "@/services/gmaps/elevation";
import { calculatePathAStarBidirectional } from "@/services/graph/calculate/path/a-star/bidirectional";
import { calculatePathAStarFromTop } from "@/services/graph/calculate/path/a-star/from-top";
import { createGraphFrom2Points } from "@/services/graph/create/from-points";
import { sortNodesByDistance } from "@/services/path/nodes/sort-by-distance";
import { searchCloserNodes } from "@/services/search/closer-nodes";
import { searchTerrainPolygons } from "@/services/search/terrain-polygons";
import type { Coordinate } from "ol/coordinate";

// Graph matrix
const distanceGap = OFFROAD_NODES_DISTANCE;
const altNodes = OFFROAD_NODES_BREADTH;
const altRoutes = 3;

export async function searchShorterOffroad(
  destination: Coordinate,
  maxDistance: number = 1000
) {
  try {
    // Cerco sentieri vicini (seleziono nodi più vicini)
    const [closerNodes, terrainPolygons] = await Promise.all([
      searchCloserNodes(destination, maxDistance),
      // Recupero i tipi di terreni nella zona
      searchTerrainPolygons(destination, maxDistance + 500),
    ]);
    const nodesByDistance = sortNodesByDistance(
      closerNodes,
      destination,
      altRoutes
    );
    console.debug("Offroad Terrain: polygons", terrainPolygons);

    // Estraggo i nodi con relative altitudini
    const [destNode, ...nodes] = await getElevations([
      destination,
      ...nodesByDistance,
    ]);
    destination[2] = destNode.elevation;

    // Ricalcolo le distanze con maggiore accuratezza
    const archWithNodes = await Promise.all(
      nodes.map(async (node) => {
        // Genero il grafo con i nodi intermedi (ogni 10 metri)
        const graph = await createGraphFrom2Points(
          [node.location.lng, node.location.lat, node.elevation],
          destination,
          distanceGap,
          altNodes
        );

        // Calcolo pesi degli archi (percorrenza in secondi)
        const bestPathAStar = calculatePathAStarFromTop(graph, terrainPolygons);
        const bestPathBiridectional = calculatePathAStarBidirectional(
          graph,
          terrainPolygons
        );

        // Restituisco il percorso migliore (e alternativa)
        return [
          {
            ...bestPathAStar,
            graph,
          },
          {
            ...bestPathBiridectional,
            graph,
          },
        ];
      })
    );

    // Estraggo il percorso migliore
    const shorterArchsAStandard = archWithNodes
      .sort((a, b) => a[0].duration - b[0].duration)
      .map((archs) => archs[0]);
    const shorterArchsABidirectional = archWithNodes
      .sort((a, b) => a[1].duration - b[1].duration)
      .map((archs) => archs[1]);
    console.debug(
      "Offroad Paths: stima accurata",
      "(a-star)",
      shorterArchsAStandard,
      "(a-bidir)",
      shorterArchsABidirectional
    );

    return [shorterArchsAStandard, shorterArchsABidirectional];
  } catch (error) {
    console.warn(`${error}`);
    throw new Error("Non è stato possibile calcolare il percorso fuori strada");
  }
}
