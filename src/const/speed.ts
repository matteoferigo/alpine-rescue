// https://www.aiptoc.it/turismo-davventura-calcolo-dei-tempi-di-percorrenza-dei-sentieri-escursionistici-il-metodo-brasiliano

// Velocità media di salita/arrampicata
export const UPHILL_SPEED = [
  { fromSlope: 0, toSlope: 10, kmh: 5, ms: 1.39 },
  { fromSlope: 10, toSlope: 20, kmh: 4, ms: 1.11 },
  { fromSlope: 20, toSlope: 30, kmh: 3, ms: 0.83 },
  { fromSlope: 30, toSlope: 40, kmh: 2, ms: 0.55 },
  { fromSlope: 40, toSlope: 50, kmh: 1, ms: 0.28 },
  { fromSlope: 50, toSlope: 60, kmh: 0.12, ms: 0.033, level: 5 },
  { fromSlope: 60, toSlope: 70, kmh: 0.06, ms: 0.017, level: 6 },
  { fromSlope: 70, toSlope: 80, kmh: 0.04, ms: 0.011, level: 6 },
  { fromSlope: 80, toSlope: 90, kmh: 0.02, ms: 0.005, level: 7 },
  { fromSlope: 90, toSlope: 100, kmh: 0.01, ms: 0.002, level: 8 },
];

// Velocità media di discesa/calata in corda
export const DOWNHILL_SPEED = [
  { fromSlope: 0, toSlope: 10, kmh: 6, ms: 1.67 },
  { fromSlope: 10, toSlope: 20, kmh: 5, ms: 1.39 },
  { fromSlope: 20, toSlope: 30, kmh: 4, ms: 1.11 },
  { fromSlope: 30, toSlope: 40, kmh: 3, ms: 0.83 },
  { fromSlope: 40, toSlope: 50, kmh: 2, ms: 0.55 },
  { fromSlope: 50, toSlope: 60, kmh: 1.2, ms: 0.33, level: 5 },
  { fromSlope: 60, toSlope: 70, kmh: 0.9, ms: 0.25, level: 6 },
  { fromSlope: 70, toSlope: 80, kmh: 0.6, ms: 0.17, level: 6 },
  { fromSlope: 80, toSlope: 90, kmh: 0.3, ms: 0.08, level: 7 },
  { fromSlope: 90, toSlope: 100, kmh: 0.2, ms: 0.05, level: 8 },
];

export const AVG_SPEED_MS = UPHILL_SPEED[3].ms; // 2km/h https://www.cai.it/wp-content/uploads/2024/04/Escursionismo-Marrosuetal.2023_signed.pdf
export const DOWNHILL_FACTOR = 0.83;
