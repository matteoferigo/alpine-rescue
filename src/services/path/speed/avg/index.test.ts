import { AVG_SPEED_MS, DOWNHILL_FACTOR, UPHILL_SPEED } from "@/const/speed";
import { getSpeedAvg } from "@/services/path/speed/avg";

describe("getSpeedAvg", () => {
  const uphillSpeed = AVG_SPEED_MS;
  const downhillSpeed = AVG_SPEED_MS * DOWNHILL_FACTOR;

  it("should return speed m/s", () => {
    const noSlope = 0;
    expect(getSpeedAvg(noSlope, true)).toEqual(uphillSpeed);
    expect(getSpeedAvg(noSlope, false)).toEqual(uphillSpeed);

    const mediumSlope = UPHILL_SPEED[3].fromSlope;
    expect(getSpeedAvg(mediumSlope, false)).toEqual(
      uphillSpeed * Math.exp(-0.05 * mediumSlope)
    );
    expect(getSpeedAvg(mediumSlope, true)).toEqual(
      downhillSpeed * Math.exp(-0.05 * mediumSlope)
    );

    const highSlope = UPHILL_SPEED[8].fromSlope;
    expect(getSpeedAvg(highSlope, false)).toEqual(
      uphillSpeed * Math.exp(-0.05 * highSlope)
    );
  });
});
