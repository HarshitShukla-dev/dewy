export interface WeatherResponse {
    coord: Coordinates;
    weather: Weather[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    clouds: Clouds;
    rain?: Precipitation;
    snow?: Precipitation;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: string | number;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface Wind {
    speed: number;
    deg: number;
    gust?: number;
}

export interface Clouds {
    all: number;
}

export interface Precipitation {
    "1h"?: number;
}

export interface Sys {
    type?: number;
    id?: number;
    message?: string;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface FetchWeatherProps {
    city?: string;
    lat?: number;
    lon?: number;
}

export interface ReverseGeoResponse {
    name: string; 
    country: string;
    state?: string; 
}