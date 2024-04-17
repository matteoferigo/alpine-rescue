import { sortNodesByDistance } from "@/services/path/nodes/sort-by-distance";
import type { Coordinate } from "ol/coordinate";
import { getDistance } from "ol/sphere";

jest.mock("ol/sphere", () => ({
  getDistance: jest.fn(),
}));

describe("sortNodesByDistance", () => {
  beforeAll(() => {
    (getDistance as jest.Mock<number>).mockImplementation(
      (from: Coordinate, to: Coordinate) => {
        return from[0] > to[0] ? from[0] - to[0] : to[0] - from[0];
      }
    );
  });

  const nodes = [
    [4.123, 14.123, 10],
    [2.123, 12.123, 30],
    [1.123, 11.123, 50],
    [3.123, 13.123, 90],
  ];

  it("should sort by distance from point", () => {
    const startNode = [0.123, 10.123, 0];
    expect(sortNodesByDistance(nodes, startNode)).toEqual([
      [1.123, 11.123, 50],
      [2.123, 12.123, 30],
      [3.123, 13.123, 90],
      [4.123, 14.123, 10],
    ]);

    const endNode = [5.123, 15.123, 100];
    expect(sortNodesByDistance(nodes, endNode)).toEqual([
      [4.123, 14.123, 10],
      [3.123, 13.123, 90],
      [2.123, 12.123, 30],
      [1.123, 11.123, 50],
    ]);

    const middleNode = [3.0, 13.0, 40];
    expect(sortNodesByDistance(nodes, middleNode)).toEqual([
      [3.123, 13.123, 90],
      [2.123, 12.123, 30],
      [4.123, 14.123, 10],
      [1.123, 11.123, 50],
    ]);
  });
});
