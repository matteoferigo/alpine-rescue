import type { HelicopterRouteContextValue } from "@/contexts/route/helicopter/types";
import { createContext } from "react";

export default createContext<Partial<HelicopterRouteContextValue>>({});
