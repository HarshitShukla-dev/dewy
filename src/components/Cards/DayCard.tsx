import React from 'react';

interface DayCardProps {
    className?: string;
}

const DayCard: React.FC<DayCardProps> = ({ className }) => {
    const currentDate = new Date();

    const day = currentDate.toLocaleDateString('en-US', {
        weekday: 'short',
    });

    const date = currentDate.getDate();
    const month = currentDate.toLocaleDateString('en-US', {
        month: 'long',
    });

    return (
        <div className={`day-card ${className || ''}`}>
            <div>{day},</div>
            <div>{date} {month}</div>
        </div>
    );
};

export default DayCard;