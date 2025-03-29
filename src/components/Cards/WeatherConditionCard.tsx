import React from 'react';
import { getDisplayCondition } from '../../utils/helper';

interface WeatherConditionCardProps {
    condition: string;
    iconCode: string;
}

const WeatherConditionCard: React.FC<WeatherConditionCardProps> = ({ condition, iconCode }) => {
    return (
        <div className="relative flex flex-col w-fit min-w-45 sm:min-w-69">
            <div className="text-4xl sm:text-6xl">
                <p>It's</p>
                <p>{getDisplayCondition(condition)}</p>
            </div>
            <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt={condition}
                className="-top-5 sm:-top-8 md:-top-10 right-0 absolute w-16 sm:w-20 md:w-24 lg:w-28 h-16 sm:h-20 md:h-24 lg:h-28"
            />
        </div>
    );
};

export default WeatherConditionCard;