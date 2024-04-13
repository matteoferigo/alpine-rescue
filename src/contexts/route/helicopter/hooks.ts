import HelicopterRouteContext from "@/contexts/route/helicopter";
import type { HelicopterRouteContextValue } from "@/contexts/route/helicopter/types";
import { useContext } from "react";

export const useHelicopterRouteContext = () =>
  useContext(HelicopterRouteContext) as HelicopterRouteContextValue;
