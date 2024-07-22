import { Circle, Fill, RegularShape } from "ol/style";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const powerLineStyle = new Style({
  stroke: new Stroke({
    color: "rgb(238, 175, 18)",
    width: 2,
  }),
});

export const powerPoleStyle = new Style({
  image: new Circle({
    radius: 4,
    fill: new Fill({ color: "rgb(238, 175, 18)" }),
    stroke: new Stroke({ color: "rgb(119, 82, 17)", width: 1 }),
  }),
});

export const powerPylonStyle = new Style({
  image: new RegularShape({
    points: 4,
    radius: 4,
    angle: 0.785,
    fill: new Fill({ color: "rgb(238, 175, 18)" }),
    stroke: new Stroke({ color: "rgb(119, 82, 17)", width: 1 }),
  }),
});

export const brokenPoleStyle = new Style({
  image: new RegularShape({
    points: 4,
    radius: 6,
    angle: 0.785,
    fill: new Fill({ color: "white" }),
    stroke: new Stroke({ color: "rgb(100, 125, 200)", width: 2 }),
  }),
});
