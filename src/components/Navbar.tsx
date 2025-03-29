import { memo } from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            <div className="font-logo text-xl">dewy</div>
            <ThemeToggle />
        </nav>
    );
};

export default memo(Navbar);