import { useWeatherContext } from "@/contexts/weather/hooks";
import { getWeatherIcon } from "@/services/openweather/icon";
import { fetchWeather } from "@/services/openweather/weather";
import type { Coordinate } from "ol/coordinate";

export const useLoadCurrentWeather = () => {
  const {
    setWeatherIcon,
    setTemperature,
    setWindSpeed,
    setWindDirection,
    setFallingRain,
    setFallingSnow,
  } = useWeatherContext();

  return async (coordinate: Coordinate) => {
    // Recupero i dati metereologici
    const weather = await fetchWeather(coordinate);

    // Registro i valori
    setWeatherIcon(getWeatherIcon(weather.weather[0].icon));

    setTemperature(weather.main.temp);

    setWindSpeed(weather.wind.speed);
    setWindDirection(weather.wind.deg);

    if (weather.rain) setFallingRain(weather.rain["1h"]);

    if (weather.snow) setFallingSnow(weather.snow["1h"]);

    // Restituisco i valori per confronto immediato
    return weather;
  };
};
