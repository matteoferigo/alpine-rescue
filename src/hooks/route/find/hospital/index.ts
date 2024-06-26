import { useDriveRouteContext } from "@/contexts/route/drive/hooks";
import { useHelicopterRouteContext } from "@/contexts/route/helicopter/hooks";
import { useShowErrorMessage } from "@/hooks/error/message";
import { searchCloserRescuePoint } from "@/services/search/closer-rescue";
import type { Coordinate } from "ol/coordinate";

export const useFindCloserHospital = () => {
  const showError = useShowErrorMessage();
  const { setDepartureCoords } = useDriveRouteContext();
  const { setHeliportCoords } = useHelicopterRouteContext();

  return async function (destinationCoords: Coordinate) {
    try {
      // Cerco ospedale più vicino
      const closerHospital = await searchCloserRescuePoint(destinationCoords);

      // Assegno valori di partenza per le rotte
      setDepartureCoords(closerHospital);
      setHeliportCoords(closerHospital);

      // Restituisco coordinate
      return closerHospital;
    } catch (error) {
      showError(error);
    }
  };
};
