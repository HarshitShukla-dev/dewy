import { FC } from 'react';
import { motion } from 'framer-motion';
import TemperatureCard from '../components/Cards/TemperatureCard';
import DayCard from '../components/Cards/DayCard';
import WeatherConditionCard from '../components/Cards/WeatherConditionCard';
import LocationCard from '../components/Cards/LocationCard';
import WeatherDetailsCard from '../components/Cards/WeatherDetailsCard';

interface MainSectionProps {
    // Define your props here
}

const MainSection: FC<MainSectionProps> = () => {
    return (
        <main className="relative flex flex-col flex-1 justify-between px-5 sm:px-12 py-4 sm:py-8 overflow-hidden">
            <motion.div
                className='top-1/2 z-0 absolute self-center bg-yellow-300/70 dark:bg-yellow-300/40 blur-[200px] rounded-full w-[90vw] h-[90vw]'
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
                <TemperatureCard temperature={27} />
                <DayCard className='right-0 absolute self-end text-xl sm:text-2xl cursor-default' />
            </motion.div>
            <motion.div
                className='z-10 flex lg:flex-row flex-col flex-2 justify-end lg:justify-center lg:items-center gap-2 sm:gap-5'
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="mb-2" >
                    <WeatherConditionCard condition='rain' iconCode='10d' />
                </div>
                <div >
                    <LocationCard city='Phagwara' state='Punjab' country='India' />
                </div>
                <div >
                    <WeatherDetailsCard humidity={50} windSpeed={60} />
                </div>
            </motion.div>
        </main>
    );
};

export default MainSection;