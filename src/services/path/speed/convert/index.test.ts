import { convertKmhToMs } from "@/services/path/speed/convert/kmh-to-ms";
import { convertKnotsToKmh } from "@/services/path/speed/convert/knots-to-kmh";
import { convertMsToKmh } from "@/services/path/speed/convert/ms-to-kmh";

describe("speedConvertion", () => {
  it("should convert km/h to m/s", () => {
    expect(convertKmhToMs(36)).toEqual(10);
  });
  it("should convert m/s to km/h", () => {
    expect(convertMsToKmh(10)).toEqual(36);
  });
  it("should convert knots to km/h", () => {
    expect(Math.round(convertKnotsToKmh(5.4))).toEqual(10);
  });
});
