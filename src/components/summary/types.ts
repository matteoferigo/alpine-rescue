import type { Dispatch, SetStateAction } from "react";

export type SummaryComponentProps = {
  open: boolean;
  showABidirectional: boolean;
  setShowABidirectional: Dispatch<SetStateAction<boolean>>;
};
