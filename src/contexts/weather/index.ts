import type { WeatherContextValue } from "@/contexts/weather/types";
import { createContext } from "react";

export default createContext<Partial<WeatherContextValue>>({});
