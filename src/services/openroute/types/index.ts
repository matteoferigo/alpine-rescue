import type { Coordinate } from "ol/coordinate";

export type ResponseMetadata = {
  attribution: string;
  timestamp: number;
  version: string;
  query: {
    coordinates: Coordinate[];
    format: string;
    profile: string;
  }
};