// https://openweathermap.org/weather-conditions#Icon-list

export const getWeatherIcon = (icon: string) =>
  `/openweather/icon/${icon}@2x.png`;
