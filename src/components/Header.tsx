import { useEffect, useState } from "react";
import "../assets/Header.css";
import { useCategory } from "../context/CategoryContext"; // Importing useCategory hook
import { Category } from "../context/CategoryContext"; // Importing Category type
import { DarkModeProvider } from "../context/DarkModeContext"; // Importing DarkModeContext
import { useContext } from "react";
import Checkbox from "./Checkbox";


function Header() {
  const { changeCategory } = useCategory(); // Getting changeCategory from the context

  const { darkMode, setDarkMode } = useContext(DarkModeProvider);
  const [dropdown, setDropdown] = useState(false);
  const [programming, setProgramming] = useState(false);
  const [pun, setPun] = useState(false);
  const [spooky, setSpooky] = useState(false);
  const [christmas, setChristmas] = useState(false);
  const [favorites, setFavorites] = useState(false);
  const [category, setCategory] = useState("");

  // a quick check to initiate the category to 'Category'
  useEffect(() => {
    if (!programming && category == "") {
      const lastCategory = localStorage.getItem("lastCategory");
      if (
        lastCategory !== null &&
        lastCategory !== "DummyCategory" &&
        lastCategory !== "Category"
      ) {
        changeCategory(lastCategory as Category);

        let tempCheckbox: (value: boolean) => void;
        if (lastCategory === "Programming") {
          tempCheckbox = setProgramming;
        } else if (lastCategory === "Pun") {
          tempCheckbox = setPun;
        } else if (lastCategory === "Spooky") {
          tempCheckbox = setSpooky;
        } else if (lastCategory === "Christmas") {
          tempCheckbox = setChristmas;
        } else {
          tempCheckbox = setFavorites;
        }
        tempCheckbox(true);
        setCategory(lastCategory as Category);
        setDropdown(false);
      } else {
        changeCategory("Category");
      }
    }
  }, []);

  function handleDropdown() {
    setDropdown(!dropdown);
  }

  function handleCheck({
    checked,
    categoryType,
    setChecked,
  }: {
    checked: boolean;
    categoryType: Category;
    setChecked: (value: boolean) => void;
  }) {
    setProgramming(false);
    setPun(false);
    setSpooky(false);
    setChristmas(false);
    setFavorites(false);
    setChecked(!checked);
    setCategory(categoryType);

    setDropdown(false);

    const wasProgramming = programming == true && categoryType == "Programming";
    const wasPun = pun == true && categoryType == "Pun";
    const wasSpooky = spooky == true && categoryType == "Spooky";
    const wasChristmas = christmas == true && categoryType == "Christmas";
    const wasFavorites = favorites == true && categoryType == "Favorites";

    // checks if the user unchecked a category - if so, set category to 'Category'.
    if (wasProgramming || wasPun || wasSpooky || wasChristmas || wasFavorites) {
      changeCategory("Category");
    } else {
      changeCategory(categoryType);
    }
  }

  function getCategory() {
    if (programming) {
      return "Programming";
    } else if (pun) {
      return "Pun";
    } else if (spooky) {
      return "Spooky";
    } else if (christmas) {
      return "Christmas";
    } else if (favorites) {
      return "Favorites";
    } else {
      return "Category";
    }
  }

  return (
    <>
      <div className="header">
        <div className="dropdownButtonWrapper">
          <button className="dropdownButton" onClick={handleDropdown}>
            <label className="DdBlabel">{getCategory()}</label>
            <i className="arrow"></i>
          </button>
          {dropdown ? (
            <div className="dropdown">
              <Checkbox
                name="Programming"
                checked={programming}
                onChange={() =>
                  handleCheck({
                    checked: programming,
                    categoryType: "Programming",
                    setChecked: setProgramming,
                  })
                }
              />
              <Checkbox
                name="Pun"
                checked={pun}
                onChange={() =>
                  handleCheck({
                    checked: pun,
                    categoryType: "Pun",
                    setChecked: setPun,
                  })
                }
              />
              <Checkbox
                name="Spooky"
                checked={spooky}
                onChange={() =>
                  handleCheck({
                    checked: spooky,
                    categoryType: "Spooky",
                    setChecked: setSpooky,
                  })
                }
              />
              <Checkbox
                name="Christmas"
                checked={christmas}
                onChange={() =>
                  handleCheck({
                    checked: christmas,
                    categoryType: "Christmas",
                    setChecked: setChristmas,
                  })
                }
              />
              <Checkbox
                name="Favorites"
                checked={favorites}
                onChange={() =>
                  handleCheck({
                    checked: favorites,
                    categoryType: "Favorites",
                    setChecked: setFavorites,
                  })
                }
              />
            </div>
          ) : null}
        </div>
        <div className="logo">
          <p>JOKEMASTER-3000</p>
        </div>
        <div className="switch">
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
