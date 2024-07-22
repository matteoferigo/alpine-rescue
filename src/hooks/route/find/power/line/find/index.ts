import { usePowerNetworkContext } from "@/contexts/power/lines/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { createGeomWaysFeatures } from "@/services/map/features/geom";
import { searchPowerLinesInMap } from "@/services/search/power-lines";
import type { Coordinate } from "ol/coordinate";

export const useFindPowerLines = () => {
  const showError = useShowErrorMessage();
  const { setPowerPoles, setPowerLines } = usePowerNetworkContext();

  return async function (bbox: Coordinate[], limit?: number) {
    try {
      // Cerco rete elettrica nell'area
      const powerLinesInArea = await searchPowerLinesInMap(bbox, limit);

      // Salvo tracciati delle linee elettiche
      setPowerPoles(
        powerLinesInArea.map(({ geometry }) =>
          geometry.map((node) => [node.lon, node.lat])
        )
      );
      setPowerLines(createGeomWaysFeatures(powerLinesInArea));

      // Restituisco risultato
      return powerLinesInArea;
    } catch (error) {
      showError(error);
    }
  };
};
