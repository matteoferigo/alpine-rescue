import { calculateSlope } from "@/services/path/way/slope";

describe("calculateSlope", () => {
  it("should return slope percentage", () => {
    expect(calculateSlope(10, 10)).toEqual(50);
    expect(calculateSlope(10, 5)).toEqual(30);
    expect(calculateSlope(0, 10)).toEqual(100);
    expect(calculateSlope(10, 0)).toEqual(0);
  });
});
