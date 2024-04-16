import WeatherContext from "@/contexts/weather";
import { createElement, useState, type PropsWithChildren } from "react";

const WeatherProvider = ({ children }: PropsWithChildren) => {
  const [weatherIcon, setWeatherIcon] = useState<string>();

  const [temperature, setTemperature] = useState<number>();

  const [windSpeed, setWindSpeed] = useState<number>(); // meter/sec
  const [windDirection, setWindDirection] = useState<number>(); // deg

  const [fallingRain, setFallingRain] = useState<number>(); // mm/h

  const [fallingSnow, setFallingSnow] = useState<number>(); // mm/h

  const value = {
    weatherIcon,
    setWeatherIcon,

    temperature,
    setTemperature,

    windSpeed,
    setWindSpeed,
    windDirection,
    setWindDirection,

    fallingRain,
    setFallingRain,

    fallingSnow,
    setFallingSnow,
  };

  return createElement(WeatherContext.Provider, { value }, children);
};

export default WeatherProvider;
