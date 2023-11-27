import { useState, useEffect } from "react";
import "../assets/DropdownMenu.css";
import ClearIcon from "../assets/images/clear-icon.png";

type DropdownProps = {
  filter: string;
  options: string[];
  onSelect: (option: string) => void;
};

type ButtonProps = {
  name: string;
  onClick: () => void;
  checkedOption: string;
};

function ButtonInside({ name, onClick, checkedOption }: ButtonProps) {
  return (
    <button className="dropdownButtonInside" onClick={onClick}>
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

  useEffect(() => {
    if (!initialLoad) {
      sessionStorage.setItem(filter, checkedOption);
    }
  }, [filter, checkedOption]);

  const handleOptionClick = (option: string) => {
    if (option !== checkedOption) {
      setFilterApplied(true);
      setCheckedOption(option);
      onSelect(option);
    }
    setIsOpen(false);
  };

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClear = () => {
    setFilterApplied(false);
    onSelect(filter);
    setCheckedOption(filter);
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="dropdownButtonWrapper">
      <button className="dropdownButton" onClick={handleDropdown}>
        <label className="DdBlabel">{checkedOption}</label>
        <i className="dropdownArrow"></i>
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
