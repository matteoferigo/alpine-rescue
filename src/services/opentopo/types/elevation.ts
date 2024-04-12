export type ElevationsResponse = {
  results: ElevationResult[];
  status: "OK";
};

export type ElevationResult = {
  dataset: string;
  elevation: number;
  location: {
    lat: number;
    lng: number;
  };
};
