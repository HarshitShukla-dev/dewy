import { memo } from "react";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            <div className="font-logo text-xl">dewy</div>
            <div className="flex items-center">
                <SearchBar onSearch={() => { }} />
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default memo(Navbar);