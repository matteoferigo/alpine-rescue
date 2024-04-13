import type { DriveRouteContextValue } from "@/contexts/route/drive/types";
import { createContext } from "react";

export default createContext<Partial<DriveRouteContextValue>>({});
