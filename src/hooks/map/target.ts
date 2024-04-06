import { useMapInstance } from "@/hooks/map/instance";
import { useEffect, useRef } from "react";

export const useMapTargetRef = () => {
  const ref = useRef<HTMLDivElement>(null);
  const map = useMapInstance();

  useEffect(() => {
    map?.setTarget(ref.current!);

    return () => {
      map?.setTarget(undefined);
    };
  }, [map]);

  return ref;
};
