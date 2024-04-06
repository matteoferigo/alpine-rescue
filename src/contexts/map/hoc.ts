import MapProvider from "@/contexts/map/provider";
import { createElement, type FC } from "react";

// eslint-disable-next-line react/display-name
const withMapProvider = <P extends {}>(C: FC<P>) => (props: P) =>
    createElement(MapProvider, null, createElement(C, props));

export default withMapProvider;
