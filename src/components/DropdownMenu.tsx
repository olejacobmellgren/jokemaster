import { useState, useEffect } from "react";
import "../assets/DropdownMenu.css";
import ClearIcon from "../assets/images/clear-icon.png";

// Props for DropdownMenu
type DropdownProps = {
  filter: string;
  options: string[];
  onSelect: (option: string) => void;
};

// Props for buttons inside DropdownMenu
type ButtonProps = {
  name: string;
  onClick: () => void;
  checkedOption: string;
};

// Component for buttons inside DropdownMenu. Selected filter has green color
function ButtonInside({ name, onClick, checkedOption }: ButtonProps) {
  return (
    <button className="dropdown-button-inside" onClick={onClick}>
      <span style={{ color: name == checkedOption ? "#00CC00" : "" }}>
        {name}
      </span>
    </button>
  );
}

function DropdownMenu({ filter, options, onSelect }: DropdownProps) {
  const [checkedOption, setCheckedOption] = useState<string>(filter);
  const [isOpen, setIsOpen] = useState(false);
  const [filterApplied, setFilterApplied] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Initial useEffect that runs. Makes sure to initiate the filter stored in sessionStorage. If nothing is stored, set filter to "Category"
  useEffect(() => {
    const storedCategory = sessionStorage.getItem("Category");
    if (storedCategory) {
      setCheckedOption(storedCategory);
      if (storedCategory !== "Category") {
        setFilterApplied(true);
      }
    }
    setInitialLoad(false);
  }, []);

  // Updates sessionStorage when filter is applied
  useEffect(() => {
    if (!initialLoad) {
      sessionStorage.setItem(filter, checkedOption);
    }
  }, [filter, checkedOption]);

  // Updates applied filter and closes dropdownMenu
  const handleOptionClick = (option: string) => {
    if (option !== checkedOption) {
      setFilterApplied(true);
      setCheckedOption(option);
      onSelect(option);
    }
    setIsOpen(false);
  };

  // Closes and opens dropdownMenu
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Resets filter
  const handleClear = () => {
    setFilterApplied(false);
    onSelect(filter);
    setCheckedOption(filter);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="dropdown-button-wrapper">
      <button className="dropdown-button" onClick={handleDropdown}>
        <label className="DdBlabel">{checkedOption}</label>
        <i className="dropdown-arrow"></i>
      </button>
      <div className={`dropdown ${isOpen ? "active" : "closed"}`}>
        {options.map((option) => {
          return (
            <ButtonInside
              key={option}
              name={option}
              onClick={() => handleOptionClick(option)}
              checkedOption={checkedOption}
            />
          );
        })}
      </div>
      {filterApplied && (
        <button
          className="clear-button"
          onClick={handleClear}
          data-testid="clear"
        >
          <img src={ClearIcon}></img>
        </button>
      )}
    </div>
  );
}

export default DropdownMenu;
