import type { LatLon } from "@/services/overpass/types/latlon";
import { getWayCloserNode } from "@/services/path/way/closer-node";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

jest.mock("ol/sphere", () => ({
  getDistance: jest.fn(),
}));

describe("getWayCloserNode", () => {
  const geometry: LatLon[] = [
    { lat: 11.123, lon: 1.123 },
    { lat: 12.123, lon: 2.123 },
    { lat: 13.123, lon: 3.123 },
    { lat: 14.123, lon: 4.123 },
    { lat: 15.123, lon: 5.123 },
  ];

  beforeAll(() => {
    (getDistance as jest.Mock<number>).mockImplementation(
      (from: Coordinate, to: Coordinate) => {
        return +(from[0] > to[0] ? from[0] - to[0] : to[0] - from[0]).toFixed(
          3
        );
      }
    );
  });

  it("should return distance in meters", () => {
    const point = [3.0, 13.0];
    expect(getWayCloserNode(geometry, point)).toEqual({
      coordinate: [3.123, 13.123],
      distance: 0.123,
    });
  });
});
