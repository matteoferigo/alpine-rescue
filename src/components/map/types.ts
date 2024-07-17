import type { Coordinate } from "ol/coordinate";

export type MapComponentProps = {
  center: Coordinate;
  zoom: number;
  searching: boolean;
  showABidirectional: boolean;
  showDriveRoute: boolean;
  onSearchStart(): void;
  onSearchEnd(): void;
};
