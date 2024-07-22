import { usePowerNetworkContext } from "@/contexts/power/lines/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { searchCloserPowerStation } from "@/services/search/closer-station";
import type { Coordinate } from "ol/coordinate";

export const useFindCloserPowerStation = () => {
  const showError = useShowErrorMessage();
  const { setPowerStation } = usePowerNetworkContext();

  return async function (destinationCoords: Coordinate) {
    try {
      // Cerco ospedale più vicino
      const closerPowerStation = await searchCloserPowerStation(
        destinationCoords
      );

      // Assegno valori di partenza per le rotte
      setPowerStation(closerPowerStation);

      // Restituisco coordinate
      return closerPowerStation;
    } catch (error) {
      showError(error);
    }
  };
};
