import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col flex-1 space-y-4 p-4 w-full max-h-dvh overflow-hidden animate-pulse">
            {/* Upper row with 2 skeletons */}
            <div className="flex md:flex-row flex-col flex-1 md:space-x-4 space-y-4 md:space-y-0">
                <div className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-full md:w-1/2 h-60"></div>
                <div className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-full md:w-1/2 h-60"></div>
            </div>

            {/* Bottom row with 3 skeletons */}
            <div className="flex md:flex-row flex-col flex-2 md:space-x-4 space-y-4 md:space-y-0">
                <div className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-full md:w-1/3 h-60"></div>
                <div className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-full md:w-1/3 h-60"></div>
                <div className="bg-zinc-300 dark:bg-zinc-700 rounded-md w-full md:w-1/3 h-60"></div>
            </div>
        </div>
    );
};

export default Loading;