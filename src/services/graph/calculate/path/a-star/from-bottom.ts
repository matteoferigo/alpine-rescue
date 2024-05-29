import { calculateArchWeight } from "@/services/graph/calculate/weight";
import type { WeightedPath } from "@/services/graph/types";
import type { TerrainPolygon } from "@/services/terrain/types";
import type { Coordinate } from "ol/coordinate";

export function calculatePathAStarFromBottom(
  graph: Coordinate[][],
  terrains: TerrainPolygon[]
) {
  // Parto dall'ultimo nodo
  const firstNode = graph.at(0)![0];
  const lastNode = graph.at(-1)![0];
  const crossingNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [lastNode],
    archs: [],
  };

  // Visito i prossimi nodi e calcolo la stima di costo (percorrenza in secondi)
  for (let index = 1; index < graph.length; index++) {
    // Recupero estremi della soluzione
    const fromNode = firstNode;
    const toNode = crossingNodes.nodes.at(0)!;

    // Recupero nodi raggiungibili
    const nextNodes = graph.at(-(index + 1))!;

    // Recupero miglior nodo, prima dal fondo
    const nextBest = getBestNode(nextNodes, fromNode, toNode, terrains);
    const nextNode = nextBest.nodes[0];
    const nextArch = nextBest.archs[1];

    // Appendo migliori nodi al grafo
    crossingNodes.distance += nextArch.distance;
    crossingNodes.duration += nextArch.duration;
    crossingNodes.nodes.unshift(nextNode);
    crossingNodes.archs.unshift(nextArch);
  }

  // Combino i due grafi
  return {
    distance: crossingNodes.distance,
    duration: crossingNodes.duration,
    nodes: [firstNode, ...crossingNodes.nodes],
    archs: crossingNodes.archs,
  };
}

function getBestNode(
  nodes: Coordinate[],
  fromNode: Coordinate,
  toNode: Coordinate,
  terrains: TerrainPolygon[]
) {
  return nodes.reduce((acc: WeightedPath | null, node) => {
    // Calcolo la percorrenza fino al nodo
    const fromArch = calculateArchWeight(fromNode, node, terrains);
    // Stimo la percorrenza fino all'ultimo nodo (ignorando il terreno)
    const toArch = calculateArchWeight(node, toNode);

    // Scelgo il nodo con minor tempo di percorrenza
    const duration = fromArch.duration + toArch.duration;

    if (!acc || acc.duration > duration) {
      return {
        distance: fromArch.distance + toArch.distance,
        duration: fromArch.duration + toArch.duration,
        nodes: [node],
        archs: [fromArch, toArch],
      };
    } else {
      return acc;
    }
  }, null)!;
}

function filterNodesByElevation(
  nodes: Coordinate[],
  lower: number,
  higher: number
) {
  // Recupero i punti che seguono il livello di altitudine
  const filtered = nodes.filter(
    ([elevation]) => elevation >= lower && elevation <= higher
  );
  // Considero il caso in cui ci sia una depressione o una cima
  return filtered.length ? filtered : nodes;
}
