import { AVG_SPEED_MS, DOWNHILL_FACTOR } from "@/const/speed";

export const getSpeedAvg = (slope: number, descending: boolean) => {
  // Senza pendenza
  if (!slope) return AVG_SPEED_MS;

  // Velocità media (metri al secondo)
  const speedAvg = descending ? AVG_SPEED_MS * DOWNHILL_FACTOR : AVG_SPEED_MS;

  // Adatto alla pendenza (funzione esponenziale)
  return speedAvg * Math.exp(-0.05 * slope);
};
