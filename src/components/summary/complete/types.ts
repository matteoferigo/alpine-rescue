import type { Dispatch, SetStateAction } from "react";

export type SummaryCompleteRouteProps = {
  showABidirectional: boolean;
  showDriveRoute: boolean;
  setShowDriveRoute: Dispatch<SetStateAction<boolean>>;
};
