import OffroadRouteContext from "@/contexts/route/offroad";
import type { OffroadRouteContextValue } from "@/contexts/route/offroad/types";
import { useContext } from "react";

export const useOffroadRouteContext = () =>
  useContext(OffroadRouteContext) as OffroadRouteContextValue;
