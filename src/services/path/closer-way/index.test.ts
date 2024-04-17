import type { LatLon } from "@/services/overpass/types/latlon";
import type { OSMType } from "@/services/overpass/types/osm-type";
import { getCloserWay } from "@/services/path/closer-way";
import { getWayCloserNode } from "@/services/path/way/closer-node";
import type { Coordinate } from "ol/coordinate";

jest.mock("@/services/path/way/closer-node", () => ({
  getWayCloserNode: jest.fn(),
}));

describe("getCloserWay", () => {
  beforeAll(() => {
    (getWayCloserNode as jest.Mock).mockImplementation(
      (geometry: LatLon[], to: Coordinate) => {
        const from = [geometry[0].lon, geometry[0].lat];
        const distance = from[0] > to[0] ? from[0] - to[0] : to[0] - from[0];
        return { coordinate: from, distance };
      }
    );
  });

  const ways = [
    [
      { lat: 12.123, lon: 2.123 },
      { lat: 13.123, lon: 3.123 },
    ],
    [
      { lat: 15.123, lon: 5.123 },
      { lat: 17.123, lon: 7.123 },
    ],
    [
      { lat: 11.123, lon: 1.123 },
      { lat: 12.123, lon: 2.123 },
    ],
    [
      { lat: 19.123, lon: 9.123 },
      { lat: 20.123, lon: 10.123 },
    ],
  ].map((geometry, index) => ({
    id: index,
    type: "way" as OSMType,
    bounds: {
      minlat: 1,
      minlon: 2,
      maxlat: 3,
      maxlon: 4,
    },
    nodes: [],
    geometry,
    tags: { test: "true" },
  }));

  it("should sort by distance from point", () => {
    const startNode = [0.123, 10.123, 0];
    expect(getCloserWay(ways, startNode)).toEqual({
      ...ways[2],
      closerNode: {
        coordinate: [1.123, 11.123],
        distance: 1,
      },
    });
  });
});
