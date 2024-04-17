import { getSpeedAvg } from "@/services/path/speed/avg";
import { calculateSlope } from "@/services/path/way/slope";
import { calculateWayTimeEstimation } from "@/services/path/way/time-estimation";

const calculateTime = (
  distance: number,
  elevation: number,
  descending: boolean
) =>
  Math.round(
    distance / getSpeedAvg(calculateSlope(distance, elevation), descending)
  );

describe("calculateWayTimeEstimation", () => {
  const distance = 100;

  it("should return time in seconds", () => {
    const noElevation = 0;
    expect(calculateWayTimeEstimation(distance, noElevation, false)).toEqual(
      calculateTime(distance, noElevation, false)
    );

    const moderateElevation = 50;
    expect(
      calculateWayTimeEstimation(distance, moderateElevation, false)
    ).toEqual(calculateTime(distance, moderateElevation, false));

    const highElevation = 200;
    expect(calculateWayTimeEstimation(distance, highElevation, false)).toEqual(
      calculateTime(distance, highElevation, false)
    );
  });
});
