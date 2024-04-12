import { DOWNHILL_SPEED, UPHILL_SPEED } from "@/const/speed";

export const getSpeedAvg = (slope: number, descending: boolean) => {
  // Velocità media (metri al secondo)
  const speedAvg = (descending ? DOWNHILL_SPEED : UPHILL_SPEED)[0].ms;

  // Adatto alla pendenza (funzione esponenziale)
  return speedAvg * Math.exp(-0.05 * slope);
};
