import axios from 'axios';
import { WeatherResponse, Coordinates, FetchWeatherProps, ReverseGeoResponse } from '../types/weather';
import { API_KEY } from './config';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_BASE_URL = 'http://api.openweathermap.org/geo/1.0/reverse';

export const fetchWeather = async ({ city, lat, lon }: FetchWeatherProps): Promise<WeatherResponse> => {
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