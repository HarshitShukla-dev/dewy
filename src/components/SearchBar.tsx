import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, X, ArrowRight } from 'lucide-react';
import { useClickAway, useLocalStorage } from 'react-use';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const [recentSearches, setRecentSearches] = useLocalStorage<string[]>('recentSearches', []);
    const [focused, setFocused] = useState(false);

    useClickAway(containerRef, () => setIsOpen(false));

    const handleSearch = useCallback(() => {
        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        onSearch(trimmedQuery);

        if (!recentSearches) {
            setRecentSearches([trimmedQuery]);
            return;
        }

        if (!recentSearches.includes(trimmedQuery)) {
            setRecentSearches([trimmedQuery, ...recentSearches.slice(0, 4)]);
        }
    }, [query, recentSearches, onSearch, setRecentSearches]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSearch();
    }, [handleSearch]);

    const removeRecentSearch = useCallback((index: number, e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (recentSearches) {
            setRecentSearches(recentSearches.filter((_, i) => i !== index));
        }
        const inputElement = containerRef.current?.querySelector('input');
        if (inputElement) {
            (inputElement as HTMLInputElement).focus();
        }
    }, [recentSearches, setRecentSearches]);

    const handleSearchItemClick = useCallback((search: string) => {
        setQuery(search);
        onSearch(search);
        setIsOpen(false);
    }, [onSearch]);

    const showRecentSearches = isOpen && recentSearches && recentSearches.length > 0;

    return (
        <div ref={containerRef} className={`relative mx-auto ${focused ? 'ml-0' : 'ml-44'} w-full sm:max-w-md transition-all duration-300`}>
            <motion.div
                className="flex items-center bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-full overflow-hidden transition-all"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.01 }}
            >
                <Search
                    className="flex-shrink-0 ml-2 sm:ml-3 w-4 h-4 text-zinc-500 dark:text-zinc-400"
                    onClick={() => setIsOpen(true)}
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onClick={() => setIsOpen(true)}
                    placeholder="Search..."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="bg-transparent px-2 py-1 outline-none w-full text-zinc-900 dark:text-zinc-100 text-sm"
                />
                <button
                    onClick={handleSearch}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 mr-1 sm:mr-0.5 p-1 rounded-full transition-colors"
                    aria-label="Submit search"
                >
                    <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4 text-zinc-700 dark:text-zinc-300" />
                </button>
            </motion.div>

            <AnimatePresence>
                {showRecentSearches && (
                    <RecentSearchesList
                        searches={recentSearches}
                        onItemClick={handleSearchItemClick}
                        onRemoveItem={removeRecentSearch}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

interface RecentSearchesListProps {
    searches: string[];
    onItemClick: (search: string) => void;
    onRemoveItem: (index: number, e: React.MouseEvent) => void;
}

const RecentSearchesList: React.FC<RecentSearchesListProps> = ({ searches, onItemClick, onRemoveItem }) => (
    <motion.div
        className="z-10 absolute bg-zinc-100 dark:bg-zinc-950 mt-1 sm:mt-2 border border-zinc-200 dark:border-zinc-700 rounded-lg w-full overflow-hidden"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
    >
        <div className="p-1 sm:p-2">
            <div className="px-2 sm:px-3 py-1 sm:py-2 font-medium text-zinc-600 dark:text-zinc-400 text-xs uppercase tracking-wide">
                Recent Searches
            </div>
            {searches.map((search, index) => (
                <motion.div
                    key={index}
                    className="flex justify-between items-center bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors cursor-pointer"
                    onClick={() => onItemClick(search)}
                >
                    <div className="flex items-center overflow-hidden">
                        <Clock className="flex-shrink-0 mr-1 sm:mr-2 w-3 sm:w-4 h-3 sm:h-4 text-zinc-600 dark:text-zinc-400" />
                        <span className="text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm truncate">{search}</span>
                    </div>
                    <X
                        className="flex-shrink-0 ml-1 w-3 sm:w-4 h-3 sm:h-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white dark:text-zinc-400 transition-colors"
                        onClick={(e) => onRemoveItem(index, e)}
                    />
                </motion.div>
            ))}
        </div>
    </motion.div>
);

export default React.memo(SearchBar);
