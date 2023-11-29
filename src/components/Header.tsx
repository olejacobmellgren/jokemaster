import "../assets/Header.css";
import { DarkModeProvider } from "../context/DarkModeContext"; // Importing DarkModeContext
import { useContext } from "react";
import DropdownMenu from "./DropdownMenu";

// Props for Header
type HeaderProps = {
  onSelect: (option: string) => void;
};

function Header({ onSelect }: HeaderProps) {
  const { darkMode, setDarkMode } = useContext(DarkModeProvider);
  const categories = ["Programming", "Pun", "Spooky", "Christmas", "Favorites"];

  // Sends the applied filter back to App.tsx. Runs when filter is applied inside DropdownMenu
  const handleFilterChange = (value: string) => {
    onSelect(value);
  };

  return (
    <>
      <div className="header">
        <div className="dropdown-menu">
          <DropdownMenu
            filter="Category"
            options={categories}
            onSelect={(value) => handleFilterChange(value)}
          />
        </div>
        <div className="logo">
          <p>JOKEMASTER-</p>
          <p>3000</p>
        </div>
        <div className="toggle-wrapper">
          <input
            className="toggle"
            type="checkbox"
            checked={darkMode}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => {
              setDarkMode(e.target.checked);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
