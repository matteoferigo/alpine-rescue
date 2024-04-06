import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

export const pointStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: "white" }),
    stroke: new Stroke({ color: "black", width: 2 }),
  }),
});

export const trailheadPointStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: "white" }),
    stroke: new Stroke({ color: "red", width: 3 }),
  }),
});

export const offroadPointStyle = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: "white" }),
    stroke: new Stroke({ color: "rgb(0, 149, 255)", width: 3 }),
  }),
});
