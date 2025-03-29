import React from 'react';

interface LocationCardProps {
    city: string;
    state: string;
    country: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ city, state, country }) => {
    return (
        <div className="flex flex-col justify-center gap-3 bg-transparent px-4 py-3 border border-zinc-500 rounded-lg sm:min-h-35 text-xl sm:text-4xl">
            <div className="font-semibold">{city}</div>
            <div>{state}, {country}</div>
        </div>
    );
};

export default LocationCard;