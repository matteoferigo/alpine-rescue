import { createNode } from "@/services/graph/node";
import type { GraphNode } from "@/services/graph/types";
import type { GeomOutput } from "@/services/overpass/types/geom";

export const appendNode = (graph: GraphNode[], way: GeomOutput) => {
  let found = false;

  // Funzione ricorsiva per scandagliare tutto il grafo
  const scanNodes = (nodes: GraphNode[]) => {
    nodes.forEach((node) => {
      // Salto se ho già agganciato il nodo
      if (found) return;

      // Aggancio col nodo che combacia
      // le vie possono incrociarsi in punti diversi
      const matchPoint = way.nodes.find((nodeId) =>
        node.way.nodes.includes(nodeId)
      );
      if (matchPoint) {
        found = true;
        node.children.push(createNode(matchPoint, way));
        // Scandaglio i figli
      } else if (node.children.length) {
        scanNodes(node.children);
      }
    });
  };

  scanNodes(graph);
};
