import type { PowerNetworkContextValue } from "@/contexts/power/lines/types";
import { createContext } from "react";

export default createContext<Partial<PowerNetworkContextValue>>({});
