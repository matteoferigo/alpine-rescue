import type { ResponseMetadata } from "@/services/openroute/types";
import type { BoundingBox } from "@/services/openroute/types/bbox";
import type Feature from "ol/Feature";

export type DirectionsResponse = {
  type: string;
  metadata: ResponseMetadata;
  bbox: BoundingBox;
  features: DirectionsFeature[];
};

type DirectionsFeature = Feature & {
  bbox: BoundingBox;
  properties: {
    transfers: number;
    fare: number;
    segments: {
      distance: number;
      duration: number;
      steps: DirectionStep[];
    };
    way_points: number[];
    summary: {
      distance: number;
      duration: number;
    };
  };
};

type DirectionStep = {
  distance: number;
  duration: number;
  type: number;
  instruction: string;
  name: string;
  way_points: number[];
};
