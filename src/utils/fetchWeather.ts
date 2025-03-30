import axios from 'axios';
import { WeatherResponse, Coordinates, FetchWeatherProps, ReverseGeoResponse } from '../types/weather';
import { API_KEY } from './config';
import { ForecastResponse } from '../types/forecast';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/reverse';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async ({ city, lat, lon }: FetchWeatherProps): Promise<WeatherResponse> => {
    console.log(API_KEY);
    try {
        if (!city && (!lat || !lon)) {
            throw new Error('City name or coordinates are required to fetch weather data.');
        }
        let url = `${WEATHER_BASE_URL}?appid=${API_KEY}&units=metric`;
        if (lat && lon) {
            url = `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        } else {
            url = `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`
        }
        const response = await axios.get<WeatherResponse>(
            url
        );

        if (response.status !== 200) {
            if (response.data.cod === '404') {
                throw new Error('City not found');
            }
            throw new Error(`Weather data could not be fetched: ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        console.error('Error fetching weather:', error.message);
        if (axios.isAxiosError(error)) {
            if (error.response?.data?.cod === '404') {
                throw new Error('City not found');
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch weather data.');
        } else {
            throw new Error(error.message || 'Failed to fetch weather data.');
        }
    }
};

export const fetchCityStateCountry = async ({ lat, lon }: Coordinates): Promise<ReverseGeoResponse | null> => {
    try {
        const response = await axios.get<ReverseGeoResponse[]>(
            `${GEO_BASE_URL}?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
        );

        if (response.status === 200 && response.data.length > 0) {
            const locationData = response.data[0];
            return {
                name: locationData.name,
                country: locationData.country,
                state: locationData.state,
            };
        } else {
            console.warn('Reverse geocoding failed or returned no results.');
            return null;
        }
    } catch (error: any) {
        console.error('Error fetching reverse geocoding data:', error.message);
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
        }
        return null;
    }
};

export const fetchForecast = async ({ city, lat, lon }: FetchWeatherProps): Promise<ForecastResponse> => {
    try {
        if (!city && (!lat || !lon)) {
            throw new Error('City name or coordinates are required to fetch forecast data.');
        }

        let url = `${FORECAST_BASE_URL}?appid=${API_KEY}&units=metric`;
        if (lat && lon) {
            url = `${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        } else {
            url = `${FORECAST_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        }
        const response = await axios.get<ForecastResponse>(url);

        if (response.status !== 200) {
            throw new Error(`Forecast data could not be fetched: ${response.status}`);
        }

        return response.data;
    } catch (error: any) {
        console.error('Error fetching forecast:', error.message);
        if (axios.isAxiosError(error)) {
            if (error.response?.data?.cod === '404') {
                throw new Error('City not found');
            }
            throw new Error(error.response?.data?.message || 'Failed to fetch forecast data.');
        } else {
            throw new Error(error.message || 'Failed to fetch forecast data.');
        }
    }
};