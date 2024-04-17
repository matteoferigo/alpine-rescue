import { calculateArchWeight } from "@/services/graph/calculate/weight";
import type { WeightedPath } from "@/services/graph/types";
import { filterNodesByElevation } from "@/services/path/nodes/filter-by-elevation";
import { sortNodesByElevation } from "@/services/path/nodes/sort-by-elevation";
import type { TerrainPolygon } from "@/services/terrain/types";
import type { Coordinate } from "ol/coordinate";

export function calculatePathAStar(
  graph: Coordinate[][],
  terrains: TerrainPolygon[]
) {
  // Parto dagli estremi
  const firstNode = graph.at(0)![0];
  const lastNode = graph.at(-1)![0];
  const firstNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [firstNode],
    archs: [],
  };
  const lastNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [lastNode],
    archs: [],
  };

  // Mi avvicino man-mano verso il centro del grafo
  const middle = Math.ceil(graph.length / 2);

  // Visito i prossimi nodi e calcolo la stima di costo (percorrenza in secondi)
  for (let index = 1; index < middle; index++) {
    // Recupero estremi della soluzione
    const fromNode = firstNodes.nodes.at(-1)!;
    const toNode = lastNodes.nodes.at(0)!;

    // Parto dal fonto
    // Recupero nodi figli
    const nextLastLeaves = graph.at(-(index + 1))!;

    // Recupero miglior nodo, riducendo la profondità del grafo
    const nextLastNodes = filterNodes(nextLastLeaves, toNode, fromNode);
    const nextLast = getBestNode(nextLastNodes, fromNode, toNode, terrains);
    const nextLastNode = nextLast.nodes[0];
    const nextLastArch = nextLast.archs[1];

    // Appendo migliori nodi al grafo
    lastNodes.distance += nextLastArch.distance;
    lastNodes.duration += nextLastArch.duration;
    lastNodes.nodes.unshift(nextLastNode);
    lastNodes.archs.unshift(nextLastArch);

    // Recupero nodi figli
    const nextFirstLeaves = graph.at(index)!;

    // Se profondità dispari evito di calcolare 2 volte il centro
    if (nextFirstLeaves !== nextLastLeaves) {
      // Recupero miglior nodo, riducendo la profondità del grafo
      const nextFirstNodes = filterNodes(
        nextFirstLeaves,
        fromNode,
        nextLastNode
      );
      const nextFirst = getBestNode(
        nextFirstNodes,
        fromNode,
        nextLastNode,
        terrains
      );
      const nextFirstNode = nextFirst.nodes[0];
      const nextFirstArch = nextFirst.archs[0];

      // Appendo migliori nodi al grafo
      firstNodes.distance += nextFirstArch.distance;
      firstNodes.duration += nextFirstArch.duration;
      firstNodes.nodes.push(nextFirstNode);
      firstNodes.archs.push(nextFirstArch);
    }
  }

  // Combino i due grafi
  return {
    distance: firstNodes.distance + lastNodes.distance,
    duration: firstNodes.duration + lastNodes.duration,
    nodes: [...firstNodes.nodes, ...lastNodes.nodes],
    archs: [...firstNodes.archs, ...lastNodes.archs],
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
    // Stimo la percorrenza fino all'ultimo nodo
    const toArch = calculateArchWeight(node, toNode, terrains);

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

function filterNodes(
  nodes: Coordinate[],
  fromNode: Coordinate,
  toNode: Coordinate
) {
  const descending = fromNode[2] > toNode[2];
  const lowerElevation = descending ? toNode[2] : fromNode[2];
  const higherElevation = descending ? fromNode[2] : toNode[2];

  // Recupero i punti che seguono il livello di altitudine
  const filtered = filterNodesByElevation(
    nodes,
    lowerElevation,
    higherElevation
  );

  // Nel caso in cui ci sia una depressione o una cima
  // Restituisco nodi con minore dislivello
  return sortNodesByElevation(filtered.length ? filtered : nodes, fromNode, 5);
}
