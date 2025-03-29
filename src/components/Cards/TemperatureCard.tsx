import React from 'react';

interface TemperatureCardProps {
    temperature: number;
    unit?: 'C' | 'F';
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({
    temperature,
    unit = 'C',
}) => {
    return (
        <div className="relative flex cursor-default">
            <span className="text-[200px] sm:text-[250px] leading-none">
                {temperature}
            </span>
            <span className="text-2xl">
                &deg;{unit}
            </span>
        </div>
    );
};

export default TemperatureCard;