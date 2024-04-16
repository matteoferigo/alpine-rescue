// https://openweathermap.org/current#fields_json

import type { OpenWeatherResponse } from "@/services/openweather/types/weather";
import type { Coordinate } from "ol/coordinate";

export async function fetchWeather(coordinate: Coordinate) {
  const result = await fetch(
    `/api/openweather/weather?lat=${coordinate[1]}&lon=${coordinate[0]}&units=metric`
  );
  const response: OpenWeatherResponse = await result.json();

  return response;
}
