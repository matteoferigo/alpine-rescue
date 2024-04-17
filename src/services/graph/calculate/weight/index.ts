import { TERRAIN_SPEED } from "@/const/terrain";
import type { WeightedArch } from "@/services/graph/types";
import { isNodeInPolygon } from "@/services/path/polygon/intersects/node";
import { getSpeedAvg } from "@/services/path/speed/avg";
import { calculateElevationGain } from "@/services/path/way/elevation-gain";
import { calculateWayLength } from "@/services/path/way/length";
import { calculateSlope } from "@/services/path/way/slope";
import { calculateWayTimeEstimation } from "@/services/path/way/time-estimation";
import type { TerrainPolygon, TerrainType } from "@/services/terrain/types";
import type { Coordinate } from "ol/coordinate";

export function calculateArchWeight(
  fromNode: Coordinate,
  toNode: Coordinate,
  terrains?: TerrainPolygon[]
): WeightedArch {
  // Recupero il tipo di terreno
  const terrainTags = terrains
    ? terrains.reduce((acc: TerrainType[], terrain) => {
        if (
          isNodeInPolygon(fromNode, terrain.polygon) ||
          isNodeInPolygon(toNode, terrain.polygon)
        ) {
          acc.push(terrain.type);
        }
        return acc;
      }, [])
    : [];
  // Calcolo il coefficiente relativo al terreno
  const terrainTypes = terrainTags.length
    ? terrainTags.map(
        (tag) => TERRAIN_SPEED.find((data) => data.tags.includes(tag))!
      )
    : [];
  // Se nodi si trovano su due terreni diversi faccio la media
  const terrainFactor = !terrainTypes.length
    ? 1
    : terrainTypes.reduce((acc, speed) => acc + speed.factor, 0) /
      terrainTypes.length;

  // Calcolo la distanza dell'arco (in metri)
  const elevation = calculateElevationGain(fromNode[2], toNode[2]);
  const descending = fromNode[2] > toNode[2];
  const distance = calculateWayLength(fromNode, toNode, elevation);
  const slope = calculateSlope(distance, elevation);
  const speed = getSpeedAvg(slope, descending) * terrainFactor;

  // Calcolo il peso dell'arco (in secondi)
  const duration =
    calculateWayTimeEstimation(distance, elevation, descending) * terrainFactor;

  // Restituisco tutti i parametri
  return {
    fromNode,
    toNode,
    descending,
    distance,
    duration,
    elevation,
    slope,
    speed,
    terrain: terrainTypes.map((terrain) => terrain.type),
  };
}
