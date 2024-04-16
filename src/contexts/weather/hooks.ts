import WeatherContext from "@/contexts/weather";
import type { WeatherContextValue } from "@/contexts/weather/types";
import { useContext } from "react";

export const useWeatherContext = () =>
  useContext(WeatherContext) as WeatherContextValue;
