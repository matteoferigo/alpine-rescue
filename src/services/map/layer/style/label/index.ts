import Fill from "ol/style/Fill";
import Style from "ol/style/Style";
import Text from "ol/style/Text";

export const labelStyle = new Style({
  text: new Text({
    font: "12px Arial",
    fill: new Fill({
      color: "black",
    }),
  }),
});
