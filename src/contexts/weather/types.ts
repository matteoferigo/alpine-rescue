import type { Dispatch, SetStateAction } from "react";

export type WeatherContextValue = {
  weatherIcon: string | undefined;
  setWeatherIcon: Dispatch<SetStateAction<string | undefined>>;

  temperature: number | undefined;
  setTemperature: Dispatch<SetStateAction<number | undefined>>;

  windSpeed: number | undefined;
  setWindSpeed: Dispatch<SetStateAction<number | undefined>>;
  windDirection: number | undefined;
  setWindDirection: Dispatch<SetStateAction<number | undefined>>;

  fallingRain: number | undefined;
  setFallingRain: Dispatch<SetStateAction<number | undefined>>;

  fallingSnow: number | undefined;
  setFallingSnow: Dispatch<SetStateAction<number | undefined>>;
};
