export const naturalTagFilter = `[natural~"(grassland|heath|moor|scrub|tundra|wood|bare_rock|blockfield|scree)"]`;
export const landuseTagFilter = `[landuse~"(grass|meadow|forest)"]`;
export const highwayTagFilter = "[highway]";
export const roadTagFilter = "[highway][surface=asphalt]";
export const trailTagFilter = "[highway][surface!=asphalt]";
export const trailheadTagFilter = "[highway=trailhead]";
export const hospitalTagFilter = "[amenity=hospital]";
export const heliportTagFilter = `[aeroway~"(aerodrome|heliport|helipad)"]`;
export const helipadTagFilter = "[building]"; // WARN: tag non corretto, usato come esempio per mock
