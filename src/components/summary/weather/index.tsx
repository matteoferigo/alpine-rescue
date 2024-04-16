import { useWeatherContext } from "@/contexts/weather/hooks";
import Image from "next/image";

const WeatherSummary = () => {
  const { weatherIcon, temperature } = useWeatherContext();
  const isReady = weatherIcon != null;

  return (
    isReady && (
      <div className="fixed left-2 bottom-2 pr-2 bg-white rounded border-gray-300 dark:bg-gray-800 dark:border-gray-700 flex items-center">
        <Image src={weatherIcon!} width={30} height={30} alt="Meteo" />
        <span className="text-sm text-gray-500 dark:text-gray-400">{`${temperature}°C`}</span>
      </div>
    )
  );
};

export default WeatherSummary;
