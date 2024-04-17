import { calculateWayLength } from "@/services/path/way/length";
import { getDistance } from "ol/sphere";

jest.mock("ol/sphere", () => ({
  getDistance: jest.fn(),
}));

describe("calculateWayLength", () => {
  const fromPoint = [1.123, 11.123];
  const toPoint = [10.123, 11.123];
  const distance = 100;

  beforeAll(() => {
    (getDistance as jest.Mock<number>).mockReturnValue(distance);
  });

  it("should return distance in meters", () => {
    const noElevation = 0;
    expect(calculateWayLength(fromPoint, toPoint, noElevation)).toEqual(
      distance
    );

    const moderateElevation = 50;
    expect(calculateWayLength(fromPoint, toPoint, moderateElevation)).toEqual(
      Math.round(Math.sqrt(distance ** 2 + moderateElevation ** 2))
    );
  });
});
