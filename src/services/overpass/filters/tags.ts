export const roadTagFilter = "[highway][surface=asphalt]";
export const trailTagFilter = "[highway][surface!=asphalt]";
export const trailheadTagFilter = "[highway=trailhead]";
export const hospitalTagFilter = "[amenity=hospital]";

// TODO: query che interseca i margini dei sentieri con quelli delle strade
// way(around:5000,46.5932427,12.1553343)[surface=asphalt];
// node(w:1,-1)[surface!=asphalt];
