import type { GraphNode } from "@/services/graph/types";

export const graphLastNodes = (graph: GraphNode[]) => {
  return graph.reduce((acc: number[], node) => {
    if (!node.children.length) {
      acc.push(node.id);
    } else {
      acc.push(...graphLastNodes(node.children));
    }
    return acc;
  }, []);
};
