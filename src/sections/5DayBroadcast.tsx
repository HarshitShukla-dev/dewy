import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ForecastItem } from '../types/forecast';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Droplets, Eye, Thermometer, Wind, Compass, Umbrella, Snowflake } from 'lucide-react';

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

    const dailyStats = useMemo(() => {
        const stats: Record<string, any> = {};

        Object.entries(groupedForecasts).forEach(([date, items]) => {
            const avgTemp = items.reduce((sum, item) => sum + item.main.temp, 0) / items.length;
            const maxTemp = Math.max(...items.map(item => item.main.temp_max));
            const minTemp = Math.min(...items.map(item => item.main.temp_min));
            const maxPop = Math.max(...items.map(item => item.pop));
            const hasRain = items.some(item => item.rain);
            const hasSnow = items.some(item => item.snow);

            const dominantWeather = items.reduce((acc, item) => {
                const weatherId = item.weather[0].id;
                acc[weatherId] = (acc[weatherId] || 0) + 1;
                return acc;
            }, {} as Record<number, number>);

            const dominantWeatherId = Object.entries(dominantWeather)
                .sort((a, b) => b[1] - a[1])[0][0];

            stats[date] = {
                avgTemp,
                maxTemp,
                minTemp,
                maxPop,
                hasRain,
                hasSnow,
                dominantWeatherId: Number(dominantWeatherId),
                dominantWeather: items.find(item => item.weather[0].id === Number(dominantWeatherId))?.weather[0]
            };
        });

        return stats;
    }, [groupedForecasts]);

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

    const getWindDirection = (deg: number) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(deg / 45) % 8];
    };

    const dayButtons = useMemo(() => {
        return dailyForecasts.map((dayForecast) => {
            const { date: dayKey, forecasts } = dayForecast;
            const firstForecast = forecasts[0];
            const date = new Date(firstForecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const shortDate = date.toLocaleDateString('en-US', { day: 'numeric' });
            const isSelected = dayKey === selectedDay;
            const dayStats = dailyStats[dayKey];

            return (
                <motion.button
                    key={dayKey}
                    className={`flex flex-col items-center px-5 py-3 rounded-lg cursor-pointer transition-all duration-200 ${isSelected
                        ? 'bg-zinc-300 dark:bg-zinc-700 shadow-md'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700/80'
                        }`}
                    onClick={() => handleDayClick(dayKey)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * dailyForecasts.indexOf(dayForecast) }}
                >
                    <span className="font-medium text-sm">{dayName}</span>
                    <span className="opacity-80 mb-1 text-xs">{shortDate}</span>
                    {firstForecast?.weather[0]?.icon && (
                        <motion.img
                            src={`https://openweathermap.org/img/wn/${firstForecast.weather[0].icon}.png`}
                            alt={firstForecast.weather[0].description}
                            className="w-10 h-10 filter contrast-125"
                            loading="lazy"
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                        />
                    )}
                    <div className="flex items-center space-x-1">
                        <span className="font-medium text-sm">{Math.round(dayStats.maxTemp)}°</span>
                        <span className="opacity-70 text-xs">{Math.round(dayStats.minTemp)}°</span>
                    </div>

                    {dayStats.maxPop > 0 && (
                        <div className="flex items-center mt-1 text-xs">
                            {dayStats.hasRain ?
                                <Umbrella size={12} className="mr-1 text-blue-500" /> :
                                dayStats.hasSnow ?
                                    <Snowflake size={12} className="mr-1 text-blue-300" /> :
                                    <Droplets size={12} className="mr-1 text-blue-400" />
                            }
                            <span>{Math.round(dayStats.maxPop * 100)}%</span>
                        </div>
                    )}
                </motion.button>
            );
        });
    }, [dailyForecasts, selectedDay, handleDayClick, dailyStats]);

    const forecastCards = useMemo(() => {
        if (!selectedDay || detailedForecast.length === 0) return null;

        const dayData = detailedForecast;
        const dateObj = new Date(dayData[0].dt * 1000);

        return (
            <motion.div
                className="space-y-6 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <motion.div
                        className="flex justify-between items-baseline mb-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="font-medium text-lg">
                            {dateObj.toLocaleDateString('en-US', {
                                weekday: 'long', month: 'short', day: 'numeric'
                            })}
                        </h3>
                        <div className="opacity-70 text-sm">
                            {Math.round(dailyStats[selectedDay].maxTemp)}° / {Math.round(dailyStats[selectedDay].minTemp)}°
                        </div>
                    </motion.div>

                    <motion.div
                        className="gap-2 grid grid-cols-2 md:grid-cols-4 mb-6"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg">
                            <Thermometer className="mr-2 w-5 h-5 text-amber-500" />
                            <div className="text-sm">
                                <div className="opacity-70">Feels like</div>
                                <div className="font-medium">{Math.round(dayData[0].main.feels_like)}°C</div>
                            </div>
                        </div>
                        <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg">
                            <Umbrella className="mr-2 w-5 h-5 text-blue-500" />
                            <div className="text-sm">
                                <div className="opacity-70">Precipitation</div>
                                <div className="font-medium">{Math.round(dayData[0].pop * 100)}%</div>
                            </div>
                        </div>
                        <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg">
                            <Eye className="mr-2 w-5 h-5 text-teal-500" />
                            <div className="text-sm">
                                <div className="opacity-70">Visibility</div>
                                <div className="font-medium">{(dayData[0].visibility / 1000).toFixed(1)} km</div>
                            </div>
                        </div>
                        <div className="flex items-center bg-zinc-200/50 dark:bg-zinc-800/50 p-3 rounded-lg">
                            <Cloud className="mr-2 w-5 h-5 text-slate-500" />
                            <div className="text-sm">
                                <div className="opacity-70">Cloud cover</div>
                                <div className="font-medium">{dayData[0].clouds.all}%</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div >
                    <motion.h4
                        className="mb-3 font-medium"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        Hourly Forecast
                    </motion.h4>
                    <div className="gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        {dayData.map((forecast, index) => (
                            <motion.div
                                key={forecast.dt}
                                className="bg-zinc-200/80 dark:bg-zinc-800/80 shadow-sm backdrop-blur-sm p-4 border border-zinc-300/30 dark:border-zinc-700/30 rounded-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.05 * index }}
                                whileHover={{ scale: 1.03, y: -5 }}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-medium text-sm">{new Date(forecast.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</p>
                                    <p className="font-medium text-lg">{Math.round(forecast.main.temp)}°C</p>
                                </div>

                                <div className="flex justify-center items-center my-2">
                                    {forecast.weather[0]?.icon && (
                                        <motion.img
                                            src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                            alt={forecast.weather[0].description}
                                            className="w-12 h-12 filter contrast-125"
                                            width="48"
                                            height="48"
                                            loading="lazy"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                        />
                                    )}
                                </div>
                                <p className="mb-3 text-xs text-center capitalize">{forecast.weather[0]?.description}</p>

                                <div className="gap-2 grid grid-cols-2 text-zinc-600 dark:text-zinc-400 text-xs">
                                    <div className="flex items-center">
                                        <Thermometer size={12} className="mr-1" />
                                        <span>Feels: {Math.round(forecast.main.feels_like)}°</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Droplets size={12} className="mr-1" />
                                        <span>Hum: {forecast.main.humidity}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Wind size={12} className="mr-1" />
                                        <span>{(forecast.wind.speed * 3.6).toFixed(1)} km/h</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Compass size={12} className="mr-1" />
                                        <span>{getWindDirection(forecast.wind.deg)}</span>
                                    </div>
                                </div>

                                {forecast.pop > 0 && (
                                    <div className="mt-2 pt-2 border-zinc-300/40 dark:border-zinc-700/40 border-t">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                {forecast.rain ? <Umbrella size={12} className="mr-1 text-blue-500" /> :
                                                    forecast.snow ? <Snowflake size={12} className="mr-1 text-blue-300" /> :
                                                        <Droplets size={12} className="mr-1 text-blue-400" />}
                                                <span className="text-xs">{Math.round(forecast.pop * 100)}%</span>
                                            </div>
                                            {forecast.rain && <span className="text-xs">{forecast.rain['3h']} mm</span>}
                                            {forecast.snow && <span className="text-xs">{forecast.snow['3h']} mm</span>}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div >
        );
    }, [selectedDay, detailedForecast, dailyStats]);

    return (
        <motion.div
            className="flex flex-col bg-zinc-100/80 dark:bg-zinc-900/80 shadow-lg backdrop-blur-md p-6 rounded-xl min-h-dvh"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.h2
                className="mb-6 font-semibold text-xl tracking-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                5-Day Forecast
            </motion.h2>

            <div className="flex gap-2 mb-8 pb-2 overflow-x-auto">
                {dayButtons}
            </div>

            <AnimatePresence mode="wait">
                {forecastCards}
            </AnimatePresence>
        </motion.div>
    );
};

export default React.memo(FiveDayBroadcast);