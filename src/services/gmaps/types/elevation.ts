export type ElevationsResponse = {
  results: ElevationResult[];
  status: "OK";
};

export type ElevationResult = {
  elevation: number;
  location: {
    lat: number;
    lng: number;
  };
  resolution: number;
};
