import { formatTime } from "@/services/path/time/format";

const createTime = (hours: number, minutes: number, seconds: number) =>
  seconds + minutes * 60 + hours * 3600;

describe("formatTime", () => {
  it("should print time format", () => {
    expect(formatTime(createTime(0, 0, 7))).toEqual("00m 07s");
    expect(formatTime(createTime(0, 4, 11))).toEqual("04m 11s");
    expect(formatTime(createTime(0, 28, 4))).toEqual("28m 04s");
    expect(formatTime(createTime(2, 0, 55))).toEqual("2h 00m 55s");
    expect(formatTime(createTime(24, 30, 0))).toEqual("24h 30m 00s");
  });
});
