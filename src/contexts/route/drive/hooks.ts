import DriveRouteContext from "@/contexts/route/drive";
import type { DriveRouteContextValue } from "@/contexts/route/drive/types";
import { useContext } from "react";

export const useDriveRouteContext = () =>
  useContext(DriveRouteContext) as DriveRouteContextValue;
