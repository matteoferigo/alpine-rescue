import { createNode } from "@/services/graph/node";
import type { GraphNode } from "@/services/graph/types";
import type { GeomElementWithDistance } from "@/services/path/types";

export const createGraphFromCloserTrail = (
  closerTrail: GeomElementWithDistance
) => {
  const treeGraph: GraphNode[] = [];

  // Separo ultimo tratto nel punto di fuori strada
  const lastNodeIndex = closerTrail.geometry.findIndex(
    ({ lat, lon }) =>
      closerTrail.closerNode.coordinate[0] === lon &&
      closerTrail.closerNode.coordinate[1] === lat
  );

  // Appendo segmenti di fine percorso
  const firstIndex = 0;
  treeGraph.push(
    createNode(closerTrail.nodes[firstIndex], {
      ...closerTrail,
      nodes: closerTrail.nodes.slice(firstIndex, lastNodeIndex),
      geometry: closerTrail.geometry.slice(firstIndex, lastNodeIndex),
    })
  );

  const lastIndex = closerTrail.nodes.length - 1;
  treeGraph.push(
    createNode(closerTrail.nodes[lastIndex], {
      ...closerTrail,
      nodes: closerTrail.nodes.slice(lastNodeIndex, lastIndex),
      geometry: closerTrail.geometry.slice(lastNodeIndex, lastIndex),
    })
  );

  return treeGraph;
};
