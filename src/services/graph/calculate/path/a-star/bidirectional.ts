import { calculateArchWeight } from "@/services/graph/calculate/weight";
import type { WeightedPath } from "@/services/graph/types";
import type { TerrainPolygon } from "@/services/terrain/types";
import type { Coordinate } from "ol/coordinate";

export function calculatePathAStarBidirectional(
  graph: Coordinate[][],
  terrains: TerrainPolygon[]
) {
  // Parto dagli estremi
  const startNode = graph.at(0)![0];
  const endNode = graph.at(-1)![0];
  const startingNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [startNode],
    archs: [],
  };
  const closingNodes: WeightedPath = {
    distance: 0,
    duration: 0,
    nodes: [endNode],
    archs: [],
  };

  // Assegno valori dinamici
  let startingIndex = Math.floor(graph[1].length / 2);
  let startingLevel = 1;
  let closingIndex = startingIndex;
  let closingLevel = graph.length - 2;
  // Parto dall'inizio
  let reverse = false;
  let currentNode: Coordinate = startNode;
  let goalNode: Coordinate = endNode;

  // Concludo all'incontro dei due percorsi
  while (currentNode !== goalNode) {
    // Definisco i valori
    const currentIndex = reverse ? closingIndex : startingIndex;
    const currentLevel = reverse ? closingLevel : startingLevel;
    const crossedNodes = reverse ? closingNodes : startingNodes;

    // Recupero nodi raggiungibili
    const closerNodes = getCloserNodes(
      graph,
      currentLevel,
      currentIndex,
      reverse
    );
    const nextNodes = closerNodes.reduce((acc: Coordinate[], nodes) => {
      acc.push(
        ...(nodes.filter(
          (node) => node && !crossedNodes.nodes.includes(node)
        ) as Coordinate[])
      );
      return acc;
    }, []);

    // Recupero miglior nodo
    const bestRoutes = getBestRoutes(
      nextNodes,
      currentNode,
      goalNode,
      terrains,
      reverse
    );
    // Ricongiungo i percorsi una volta raggiunto il centro
    if (Math.abs(closingLevel - startingLevel) < 2) {
      bestRoutes.sort((a, b) => a.distance - b.distance);
    }
    const [nextNode] = bestRoutes[0].nodes;
    const [nextArch] = bestRoutes[0].archs;
    const isLast = nextNode === goalNode;

    // Appendo migliori nodi al grafo
    crossedNodes.distance += nextArch.distance;
    crossedNodes.duration += nextArch.duration;
    if (reverse) {
      if (!isLast) closingNodes.nodes.unshift(nextNode);
      closingNodes.archs.unshift(nextArch);
    } else {
      if (!isLast) startingNodes.nodes.push(nextNode);
      startingNodes.archs.push(nextArch);
    }

    // Aggiorno i valori dinamici
    closerNodes.forEach((nodeLevel, levelIndex) => {
      const nodeIndex = nodeLevel.findIndex((node) => node === nextNode);
      if (nodeIndex >= 0) {
        if (reverse) {
          // Avanzo di livello
          if (levelIndex === 0) closingLevel -= 1;
          // Muovo orizzontalmente
          closingIndex += nodeIndex - 1;
        } else {
          // Avanzo di livello
          if (levelIndex === 2) startingLevel += 1;
          // Muovo orizzontalmente
          startingIndex += nodeIndex - 1;
        }
      }
    });
    // Cambio direzione
    reverse = !reverse;
    // Aggiorno i puntatori
    currentNode = reverse
      ? closingNodes.nodes.at(0)!
      : startingNodes.nodes.at(-1)!;
    goalNode = nextNode;
  }

  // Combino i due grafi
  return {
    distance: startingNodes.distance + closingNodes.distance,
    duration: startingNodes.duration + closingNodes.duration,
    nodes: [...startingNodes.nodes, ...closingNodes.nodes],
    archs: [...startingNodes.archs, ...closingNodes.archs],
  };
}

function getBestRoutes(
  nodes: Coordinate[],
  fromNode: Coordinate,
  toNode: Coordinate,
  terrains: TerrainPolygon[],
  reverse?: boolean
) {
  const closerRoutes = nodes.map((node) => {
    // Calcolo la percorrenza fino al nodo
    const fromArch = calculateArchWeight(
      reverse ? node : fromNode,
      reverse ? fromNode : node,
      terrains
    );
    // Stimo la percorrenza fino all'ultimo nodo (ignorando il terreno)
    const toArch =
      node === toNode
        ? {
            fromNode: toNode,
            toNode,
            descending: false,
            distance: 0,
            duration: 0,
            elevation: 0,
            slope: 0,
            speed: 0,
            terrain: [],
          }
        : calculateArchWeight(
            reverse ? toNode : node,
            reverse ? node : toNode,
            terrains
          );

    return {
      distance: fromArch.distance + toArch.distance,
      duration: fromArch.duration + toArch.duration,
      nodes: [node],
      archs: [fromArch, toArch],
    };
  });

  // Scelgo il nodo con minor tempo di percorrenza
  return closerRoutes.sort((a, b) => a.duration - b.duration);
}

function getCloserNodes(
  graph: Coordinate[][],
  currentLevel: number,
  currentIndex: number,
  reverse: boolean = false
) {
  const prevLevelNodes: Coordinate[] | undefined = graph[currentLevel - 1];
  const currLevelNodes: Coordinate[] = graph[currentLevel];
  const nextLevelNodes: Coordinate[] | undefined = graph[currentLevel + 1];

  // Nodi del livello corrente
  const closerNodes = [
    [
      currLevelNodes[currentIndex - 1],
      undefined,
      currLevelNodes[currentIndex + 1],
    ],
  ];

  // Nodi del livello precedente
  closerNodes.unshift(
    prevLevelNodes
      ? [
          prevLevelNodes[currentIndex - 1],
          prevLevelNodes[currentIndex],
          prevLevelNodes[currentIndex + 1],
        ]
      : []
  );
  // Nodi del livello successivo
  closerNodes.push(
    nextLevelNodes
      ? [
          nextLevelNodes[currentIndex - 1],
          nextLevelNodes[currentIndex],
          nextLevelNodes[currentIndex + 1],
        ]
      : []
  );

  return closerNodes;
}
