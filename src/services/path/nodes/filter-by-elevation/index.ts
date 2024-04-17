import type { Coordinate } from "ol/coordinate";

export const filterNodesByElevation = (
  nodes: Coordinate[],
  lower: number,
  higher: number
) => {
  // Recupero i punti che seguono il livello di altitudine
  return nodes.filter((node) => node[2] >= lower && node[2] <= higher);
};
