import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { memo } from "react";

interface RecentSearchesListProps {
    searches: string[];
    onItemClick: (search: string) => void;
    onRemoveItem: (index: number, e: React.MouseEvent) => void;
}

const RecentSearchesList: React.FC<RecentSearchesListProps> = ({ searches, onItemClick, onRemoveItem }) => (
    <motion.div
        className="z-20 absolute bg-zinc-100 dark:bg-zinc-950 mt-1 sm:mt-2 border border-zinc-200 dark:border-zinc-700 rounded-lg w-full overflow-hidden"
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

export default memo(RecentSearchesList);