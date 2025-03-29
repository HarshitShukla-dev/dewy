import { FC, memo } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar/SearchBar";

interface NavbarProps {
    onSearch: (searchCity: string) => void;
}

const Navbar: FC<NavbarProps> = ({ onSearch }) => {
    return (
        <nav className="flex justify-between items-center px-4 sm:px-8 py-2 sm:py-4">
            <div className="font-logo text-xl">dewy</div>
            <div className="flex items-center">
                <SearchBar onSearch={onSearch} />
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default memo(Navbar);