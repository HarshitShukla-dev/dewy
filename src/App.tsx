import { useState, useEffect, useCallback } from 'react';
import Navbar from "./components/Navbar";
import MainSection from "./sections/MainSection";
import { useGeolocation, useLocalStorage } from "@uidotdev/usehooks";
import { fetchWeather, fetchCityStateCountry, fetchForecast } from './utils/fetchWeather';
import { WeatherResponse } from './types/weather';
import { ForecastResponse } from './types/forecast';
import Loading from './components/Loading';
import Error from './components/Error';
import FiveDayBroadcast from './sections/5DayBroadcast';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [forecastData, setForecastData] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationInfo, setLocationInfo] = useState<{ city?: string; state?: string; country?: string } | null>(null);
  const geolocation = useGeolocation();
  const recentSearches = useLocalStorage<string[]>("recentSearches", []);

  const fetchWeatherData = useCallback(async (params: { lat?: number; lon?: number; city?: string }) => {
    setWeatherData(null);
    setForecastData(null);
    setLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled([
        fetchWeather(params),
        fetchForecast(params)
      ]);

      if (results[0].status === 'fulfilled') {
        setWeatherData(results[0].value);
      } else {
        setError(results[0].reason?.message || 'Failed to fetch weather data.');
      }

      if (results[1].status === 'fulfilled') {
        setForecastData(results[1].value);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const { latitude, longitude } = geolocation;
    if (latitude && longitude) {
      fetchWeatherData({ lat: latitude, lon: longitude });
    } else if (recentSearches.length > 0) {
      fetchWeatherData({ city: recentSearches[0].toString() });
    } else {
      fetchWeatherData({ city: 'Delhi' });
    }
  }, [geolocation.latitude, geolocation.longitude]);

  useEffect(() => {
    if (!weatherData?.coord) return;

    const { lat, lon } = weatherData.coord;

    const fetchLocation = async () => {
      try {
        const location = await fetchCityStateCountry({ lat, lon });
        setLocationInfo(location);
      } catch (error) {
        setLocationInfo({
          city: weatherData.name,
          state: weatherData.sys?.country,
          country: weatherData.sys.country
        });
      }
    };

    fetchLocation();
  }, [weatherData]);

  const handleSearch = (searchCity: string) => {
    fetchWeatherData({ city: searchCity });
  };

  const normalizeText = (text?: string) => {
    return text?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <div className="flex flex-col bg-zinc-200 dark:bg-zinc-950 min-h-dvh overflow-hidden font-mono2 text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar onSearch={handleSearch} />

      {loading && <Loading />}
      {error && <Error message={error} />}

      {weatherData && locationInfo && (
        <>
          <MainSection
            condition={weatherData.weather[0]?.main || ""}
            temperature={Math.round(weatherData.main.temp)}
            iconCode={weatherData.weather[0]?.icon || ""}
            city={normalizeText(locationInfo.city) || normalizeText(weatherData.name) || ""}
            state={locationInfo.state || weatherData.sys?.country || ""}
            country={locationInfo.country || weatherData.sys.country || ""}
            humidity={weatherData.main.humidity}
            windSpeed={Math.round(weatherData.wind.speed * 3.6)}
          />
          <FiveDayBroadcast list={forecastData?.list || []} />
        </>
      )}
    </div>
  );
}

export default App;
