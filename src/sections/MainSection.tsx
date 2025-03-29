import { FC } from 'react';
import { motion } from 'framer-motion';
import TemperatureCard from '../components/Cards/TemperatureCard';
import DayCard from '../components/Cards/DayCard';
import WeatherConditionCard from '../components/Cards/WeatherConditionCard';
import LocationCard from '../components/Cards/LocationCard';
import WeatherDetailsCard from '../components/Cards/WeatherDetailsCard';
import { getBackgroundColor } from '../utils/helper';

interface MainSectionProps {
    condition: string;
    temperature: number;
    iconCode: string;
    city: string;
    state: string;
    country: string;
    humidity: number;
    windSpeed: number;
}

const MainSection: FC<MainSectionProps> = ({
    condition,
    temperature,
    iconCode,
    city,
    state,
    country,
    humidity,
    windSpeed,
}) => {
    return (
        <main className="relative flex flex-col flex-1 justify-between px-5 sm:px-12 py-4 sm:py-8 overflow-hidden">
            <motion.div
                className={`top-1/2 z-0 absolute self-center ${getBackgroundColor(condition)} blur-[200px] rounded-full w-[90vw] h-[90vw]`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
            />
            <motion.div
                className='z-10 relative flex flex-1 justify-between items-center'
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <TemperatureCard temperature={temperature} />
                <DayCard className='right-0 absolute self-end text-xl sm:text-2xl cursor-default' />
            </motion.div>
            <motion.div
                className='z-10 flex lg:flex-row flex-col flex-2 justify-end lg:justify-center lg:items-end gap-2 sm:gap-5'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="mb-2" >
                    <WeatherConditionCard condition={condition} iconCode={iconCode} />
                </div>
                <div >
                    <LocationCard city={city} state={state} country={country} />
                </div>
                <div >
                    <WeatherDetailsCard humidity={humidity} windSpeed={windSpeed} />
                </div>
            </motion.div>
        </main>
    );
};

export default MainSection;