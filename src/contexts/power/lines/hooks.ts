import PowerNetworkContext from "@/contexts/power/lines";
import type { PowerNetworkContextValue } from "@/contexts/power/lines/types";
import { useContext } from "react";

export const usePowerNetworkContext = () =>
  useContext(PowerNetworkContext) as PowerNetworkContextValue;
