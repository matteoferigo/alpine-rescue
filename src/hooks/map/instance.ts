import { useMapContext } from "@/contexts/map/hooks";

export const useMapInstance = () => {
  const { map } = useMapContext();

  return map?.current;
};
