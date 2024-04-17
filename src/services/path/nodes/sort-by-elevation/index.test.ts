import { sortNodesByElevation } from "@/services/path/nodes/sort-by-elevation";

describe("sortNodesByElevation", () => {
  const nodes = [
    [1.123, 11.123, 50],
    [2.123, 12.123, 30],
    [3.123, 13.123, 90],
    [4.123, 14.123, 10],
  ];

  it("should sort by elevation gain", () => {
    const groundNode = [0.123, 10.123, 0];
    expect(sortNodesByElevation(nodes, groundNode)).toEqual([
      [4.123, 14.123, 10],
      [2.123, 12.123, 30],
      [1.123, 11.123, 50],
      [3.123, 13.123, 90],
    ]);

    const middleNode = [5.123, 15.123, 40];
    expect(sortNodesByElevation(nodes, middleNode)).toEqual([
      [1.123, 11.123, 50],
      [2.123, 12.123, 30],
      [4.123, 14.123, 10],
      [3.123, 13.123, 90],
    ]);
  });
});
