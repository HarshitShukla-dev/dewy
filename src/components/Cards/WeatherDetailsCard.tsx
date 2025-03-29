import React from 'react';
import { Droplets, Wind } from 'lucide-react';

interface WeatherDetailsCardProps {
    humidity: number;
    windSpeed: number;
}

const WeatherDetailsCard: React.FC<WeatherDetailsCardProps> = ({ humidity, windSpeed }) => {
    return (
        <div className="flex flex-col justify-center p-4 border border-zinc-500 rounded-lg sm:min-h-35 text-xl sm:text-4xl">
            <div className="flex items-center gap-5 mb-3">
                <Droplets className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
                <span className="font-medium">Humidity: {humidity}%</span>
            </div>
            <div className="flex items-center gap-5">
                <Wind className="w-6 sm:w-8 h-6 sm:h-8 text-blue-500" />
                <span className="font-medium">Wind Speed: {windSpeed} km/h</span>
            </div>
        </div>
    );
};

export default WeatherDetailsCard;