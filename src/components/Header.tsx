import "../assets/Header.css";
import { DarkModeProvider } from "../context/DarkModeContext"; // Importing DarkModeContext
import { useContext } from "react";
import DropdownMenu from "./DropdownMenu";

type HeaderProps = {
  onSelect: (option: string) => void;
};

function Header({ onSelect }: HeaderProps) {
  const { darkMode, setDarkMode } = useContext(DarkModeProvider);
  const categories = ["Programming", "Pun", "Spooky", "Christmas", "Favorites"];

  const handleFilterChange = (value: string) => {
    onSelect(value);
  };

  return (
    <>
      <div className="header">
        <div className="dropdownMenu">
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
        <div className="toggleWrapper">
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
