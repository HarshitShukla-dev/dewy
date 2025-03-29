import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme} className="focus:outline-none cursor-pointer">
            {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.773L5.627 15.627M3 12h2.25m.386-6.364L5.627 8.373M18.75 18.75l-1.591-1.591M12 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.334.266-2.667.743-3.986A3.706 3.706 0 0112 6.75c0 .828-.157 1.62-.471 2.384a9.079 9.079 0 002.103-.305c.557.824.94 1.654 1.128 2.486.188.831.188 1.674 0 2.505a9.559 9.559 0 014.435 4.435z" />
                </svg>
            )}
        </button>
    );
};

export default ThemeToggle;