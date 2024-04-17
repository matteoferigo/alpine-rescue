import { calculateElevationGain } from "@/services/path/way/elevation-gain";

describe("calculateElevationGain", () => {
  const elevationA = 10;
  const elevationB = 100;

  it("should return gain in meters", () => {
    expect(calculateElevationGain(elevationA, elevationB)).toEqual(90);
    expect(calculateElevationGain(elevationB, elevationA)).toEqual(90);
  });
});
