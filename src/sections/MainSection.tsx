import { FC } from 'react';
import TemperatureCard from '../components/Cards/TemperatureCard';
import DayCard from '../components/Cards/DayCard';

interface MainSectionProps {
    // Define your props here
}

const MainSection: FC<MainSectionProps> = () => {
    return (
        <main className="flex flex-col flex-1">
            <div className='relative flex flex-1 justify-between items-center'>
                <TemperatureCard temperature={27} />
                <DayCard className='right-0 absolute self-end text-xl sm:text-2xl cursor-default' />
            </div>
            <div className='flex-2'>
                hello
            </div>
        </main>
    );
};

export default MainSection;