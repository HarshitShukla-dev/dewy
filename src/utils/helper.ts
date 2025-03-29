export const getBackgroundColor = (condition: string): string => {
    switch (condition.toLowerCase()) {
        case 'thunderstorm':
            return 'bg-[#6366F1] dark:bg-[#4338CA]';
        case 'drizzle':
            return 'bg-[#93C5FD] dark:bg-[#3B82F6]';
        case 'rain':
            return 'bg-[#60A5FA] dark:bg-[#2563EB]';
        case 'snow':
            return 'bg-[#E2E8F0] dark:bg-[#CBD5E1]';
        case 'clouds':
            return 'bg-[#9CA3AF] dark:bg-[#6B7280]';
        case 'mist':
            return 'bg-[#D1D5DB] dark:bg-[#9CA3AF]';
        case 'fog':
            return 'bg-[#E5E7EB] dark:bg-[#D1D5DB]';
        case 'smoke':
            return 'bg-[#6B7280] dark:bg-[#4B5563]';
        case 'haze':
            return 'bg-[#9CA3AF] dark:bg-[#6B7280]';
        case 'dust':
            return 'bg-[#FCD34D] dark:bg-[#D97706]';
        case 'sand':
            return 'bg-[#FBBF24] dark:bg-[#B45309]';
        case 'ash':
            return 'bg-[#78716C] dark:bg-[#57534E]';
        case 'squall':
            return 'bg-[#4B5563] dark:bg-[#374151]';
        case 'tornado':
            return 'bg-[#374151] dark:bg-[#1F2937]';
        case 'clear':
            return 'bg-[#FDE68A] dark:bg-[#F59E0B]/60';
        default:
            return 'bg-[#FDE68A] dark:bg-[#F59E0B]';
    }
};

export const getDisplayCondition = (condition: string): string => {
    const conditionMap: Record<string, string> = {
        'thunderstorm': 'thunderstorming',
        'drizzle': 'drizzling',
        'rain': 'raining',
        'snow': 'snowing',
        'clouds': 'cloudy',
        'mist': 'misty',
        'smoke': 'smoky',
        'haze': 'hazy',
        'dust': 'dusty',
        'fog': 'foggy',
        'sand': 'sandy',
        'ash': 'ashy',
        'squall': 'squally',
        'tornado': 'tornado',
        'clear': 'Clear'
    };

    return conditionMap[condition.toLowerCase()] || condition;
};