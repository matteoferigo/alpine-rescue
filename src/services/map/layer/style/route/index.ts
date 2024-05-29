import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const routeStyle = new Style({
  stroke: new Stroke({
    color: "rgb(0, 149, 255)",
    width: 4,
  }),
});

export const offroadRouteStyle = new Style({
  stroke: new Stroke({
    color: "rgb(0, 149, 255)",
    lineDash: [6, 5],
    width: 3,
  }),
});

export const offroadAlternativeRouteStyle = new Style({
  stroke: new Stroke({
    color: "rgb(0, 149, 255)",
    lineDash: [2, 10],
    width: 3,
  }),
});

export const roadRouteStyle = new Style({
  stroke: new Stroke({
    color: "rgb(15, 84, 255)",
    width: 4,
  }),
});

export const flightRouteStyle = new Style({
  stroke: new Stroke({
    color: "rgba(100, 125, 200, 50)",
    lineDash: [10, 15],
    width: 4,
  }),
});

// OPAQUE
export const routeOpaqueStyle = new Style({
  stroke: new Stroke({
    color: "rgba(0, 149, 255, 50)",
    width: 4,
  }),
});

export const offroadOpaqueStyle = new Style({
  stroke: new Stroke({
    color: "rgba(0, 149, 255, 30)",
    lineDash: [6, 5],
    width: 2,
  }),
});
