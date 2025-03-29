import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative bg-transparent p-2 rounded-full"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isDark ? 0 : 360 }}
                transition={{ duration: 0.5 }}
                className="relative flex justify-center items-center w-5 h-5"
            >
                {isDark ? (
                    <Sun size={20} className="absolute text-white" fill='white' />
                ) : (
                    <Moon size={20} className="absolute text-black" fill='black' />
                )}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;