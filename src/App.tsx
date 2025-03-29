import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import MainSection from "./sections/MainSection";
import { useGeolocation } from "@uidotdev/usehooks";
import { fetchWeather, fetchCityStateCountry } from './utils/fetchWeather';
import { WeatherResponse } from './types/weather';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationInfo, setLocationInfo] = useState<{ city?: string; state?: string; country?: string } | null>(null);
  const geolocation = useGeolocation();

  useEffect(() => {
    const defaultCity = 'Delhi';

    const fetchInitialWeather = async (lat?: number, lon?: number) => {
      setWeatherData(null);
      setLoading(true);
      setError(null);

      try {
        let data: WeatherResponse;
        if (lat && lon) {
          data = await fetchWeather({ lat: lat, lon: lon });
        } else {
          data = await fetchWeather({ city: defaultCity });
        }
        setWeatherData(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch weather data.');
        setLoading(false);
      }
    };

    if (geolocation.latitude && geolocation.longitude) {
      fetchInitialWeather(geolocation.latitude, geolocation.longitude);
    } else {
      fetchInitialWeather();
    }
  }, [geolocation.latitude, geolocation.longitude]);

  useEffect(() => {
    if (weatherData?.coord) {
      const { lat, lon } = weatherData.coord;
      const fetchLocation = async () => {
        try {
          const location = await fetchCityStateCountry({ lat, lon });
          setLocationInfo(location);
        } catch (error) {
          console.error("Error fetching location info:", error);
          setLocationInfo({
            city: weatherData.name,
            state: weatherData.sys?.country,
            country: weatherData.sys.country
          });
        }
      };
      fetchLocation();
    }
  }, [weatherData]);

  const handleSearch = async (searchCity: string) => {
    setWeatherData(null);
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeather({ city: searchCity });
      setWeatherData(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-zinc-200 dark:bg-zinc-950 min-h-dvh font-mono text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar onSearch={handleSearch} />

      {loading && <Loading />}

      {error && <Error message={error} />}

      {
        weatherData && locationInfo && (
          <MainSection
            condition={weatherData.weather[0]?.main}
            temperature={Math.round(weatherData.main.temp)}
            iconCode={weatherData.weather[0]?.icon}
            city={locationInfo.city || weatherData.name}
            state={locationInfo.state || weatherData.sys?.country}
            country={locationInfo.country || weatherData.sys.country}
            humidity={weatherData.main.humidity}
            windSpeed={Math.round(weatherData.wind.speed * 3.6)}
          />
        )
      }
    </div >
  );
}

export default App;
