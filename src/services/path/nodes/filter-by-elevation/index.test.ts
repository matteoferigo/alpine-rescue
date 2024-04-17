import { filterNodesByElevation } from "@/services/path/nodes/filter-by-elevation";

describe("filterNodesByElevation", () => {
  const nodes = [
    [1.123, 11.123, 50],
    [2.123, 12.123, 30],
    [3.123, 13.123, 90],
    [4.123, 14.123, 10],
  ];

  it("should filter nodes by elevation", () => {
    const minElevation = 20;
    const maxElevation = 50;
    expect(filterNodesByElevation(nodes, minElevation, maxElevation)).toEqual([
      [1.123, 11.123, 50],
      [2.123, 12.123, 30],
    ]);
  });
});
