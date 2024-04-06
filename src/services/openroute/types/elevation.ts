import type { ResponseMetadata } from "@/services/openroute/types";

export type ElevationPointResponse = ResponseMetadata & {
  geometry: {
    type: string;
    coordinates: number[];
  };
};
