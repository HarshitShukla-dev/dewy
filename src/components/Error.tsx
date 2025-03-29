import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorProps {
    message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
    return (
        <div className="flex flex-1/2 justify-center items-center p-6 w-full">
            <div className="bg-white dark:bg-zinc-900 shadow-lg p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg w-full max-w-md transition-colors">
                <div className="flex items-center mb-4">
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-full">
                        <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="ml-3 font-medium text-zinc-900 dark:text-white text-lg">Error</h3>
                </div>

                <div className="mt-2">
                    <p className="text-zinc-700 dark:text-zinc-300">{message}</p>
                </div>

                <div className="mt-5">
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex justify-center bg-white hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 focus:ring-offset-2 w-full font-medium text-zinc-700 dark:text-zinc-200 text-sm transition-colors"
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
