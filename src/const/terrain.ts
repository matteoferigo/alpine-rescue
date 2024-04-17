// Velocità media in base a conformazione terreno
export const TERRAIN_SPEED = [
  {
    type: "grass",
    factor: 0.9,
    kmh: 4.5,
    ms: 1.25,
    tags: ["grass", "grassland", "heath", "moor"],
  },
  { type: "scrub", factor: 0.8, kmh: 4, ms: 1.11, tags: ["scrub", "tundra"] },
  {
    type: "wood",
    factor: 0.7,
    kmh: 3.5,
    ms: 0.97,
    tags: ["wood", "forest", "meadow"],
  },
  {
    type: "rock",
    factor: 0.7,
    kmh: 3.5,
    ms: 0.97,
    tags: ["bare_rock", "blockfield"],
  },
  { type: "scree", factor: 0.6, kmh: 3, ms: 0.83, tags: ["scree"] },
  // { type: "snow", factor: 0.6, kmh: 3, ms: 0.83 },
];
