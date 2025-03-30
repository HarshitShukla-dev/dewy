import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ForecastItem } from '../types/forecast';

interface FiveDayBroadcastProps {
    list: ForecastItem[];
}

const FiveDayBroadcast: React.FC<FiveDayBroadcastProps> = ({ list }) => {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const { dailyForecasts, groupedForecasts } = useMemo(() => {
        if (!list?.length) return { dailyForecasts: [], groupedForecasts: {} };

        const grouped: Record<string, ForecastItem[]> = {};
        list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toLocaleDateString();
            if (!grouped[dayKey]) {
                grouped[dayKey] = [];
            }
            grouped[dayKey].push(item);
        });

        const dailyArray = Object.entries(grouped)
            .map(([date, forecasts]) => ({ date, forecasts }))
            .slice(0, 5);

        return { dailyForecasts: dailyArray, groupedForecasts: grouped };
    }, [list]);

    const detailedForecast = useMemo(() => {
        return selectedDay ? groupedForecasts[selectedDay] || [] : [];
    }, [selectedDay, groupedForecasts]);

    useEffect(() => {
        if (dailyForecasts.length > 0) {
            setSelectedDay(dailyForecasts[0].date);
        }
    }, [dailyForecasts]);

    const handleDayClick = useCallback((dayKey: string) => {
        setSelectedDay(dayKey);
    }, []);

    const dayButtons = useMemo(() => {
        return dailyForecasts.map((dayForecast) => {
            const { date: dayKey, forecasts } = dayForecast;
            const firstForecast = forecasts[0];
            const date = new Date(firstForecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const shortDate = date.toLocaleDateString('en-US', { day: 'numeric' });
            const isSelected = dayKey === selectedDay;

            return (
                <button
                    key={dayKey}
                    className={`flex flex-col items-center px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                        ? 'bg-zinc-300 dark:bg-zinc-700 shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/80'
                        }`}
                    onClick={() => handleDayClick(dayKey)}
                >
                    <span className="font-medium text-sm">{dayName}</span>
                    <span className="opacity-80 mb-1 text-xs">{shortDate}</span>
                    {firstForecast?.weather[0]?.icon && (
                        <img
                            src={`https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`}
                            alt={firstForecast.weather[0].description}
                            className="w-10 h-10 filter contrast-125"
                            loading="lazy"
                        />
                    )}
                    <span className="font-medium text-sm">{Math.round(firstForecast?.main?.temp_max)}°C</span>
                </button>
            );
        });
    }, [dailyForecasts, selectedDay, handleDayClick]);

    const forecastCards = useMemo(() => {
        if (!selectedDay || detailedForecast.length === 0) return null;

        return (
            <div className="mt-6">
                <h3 className="mb-4 font-medium text-md">
                    {new Date(detailedForecast[0].dt * 1000).toLocaleDateString('en-US', {
                        weekday: 'long', month: 'short', day: 'numeric'
                    })}
                </h3>
                <div className="gap-2 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {detailedForecast.map((forecast) => (
                        <div
                            key={forecast.dt}
                            className="bg-zinc-200/80 dark:bg-zinc-800/80 shadow-sm backdrop-blur-sm p-3 border border-zinc-300/30 dark:border-zinc-700/30 rounded-lg"
                        >
                            <p className="font-medium text-xs">{new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                            <div className="flex justify-center items-center">
                                {forecast.weather[0]?.icon && (
                                    <img
                                        src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                                        alt={forecast.weather[0].description}
                                        className="w-8 h-8 filter contrast-125"
                                        width="32"
                                        height="32"
                                        loading="lazy"
                                    />
                                )}
                            </div>
                            <p className="text-xs text-center capitalize">{forecast.weather[0]?.description}</p>
                            <p className="font-medium text-base text-center">{Math.round(forecast.main.temp)}°C</p>

                            <div className="space-y-1 pt-1 border-zinc-300/40 dark:border-zinc-700/40 border-t text-zinc-600 dark:text-zinc-400 text-xs">
                                <p className="flex justify-between">
                                    <span>Feels:</span>
                                    <span className="font-medium">{Math.round(forecast.main.feels_like)}°C</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Hum:</span>
                                    <span className="font-medium">{forecast.main.humidity}%</span>
                                </p>
                                <p className="flex justify-between">
                                    <span>Wind:</span>
                                    <span className="font-medium">{(forecast.wind.speed * 3.6).toFixed(1)} km/h</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }, [selectedDay, detailedForecast]);

    return (
        <div className="flex flex-col bg-zinc-100/80 dark:bg-zinc-900/80 shadow-lg backdrop-blur-md p-6 rounded-xl min-h-dvh ">
            <h2 className="mb-6 font-semibold text-xl tracking-tight">5-Day Forecast</h2>

            <div className="flex gap-2 mb-8 pb-2 overflow-x-auto">
                {dayButtons}
            </div>

            {forecastCards}
        </div>
    );
};

export default React.memo(FiveDayBroadcast);