import React, { createContext, useEffect, useState } from "react";

const DarkModeContext = ({children}: { children: JSX.Element }) => {

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "dark");

  // Use Tailwind to enable darkmode for parents html-elements on first render or when darkMode is changed
  useEffect(() => {
    const html = document.documentElement;

    if (darkMode){
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const newDarkMode = (updatedDarkMode: boolean) => {
    if (updatedDarkMode) {
      localStorage.setItem("darkMode", "dark");
    } else {
      localStorage.removeItem("darkMode");
    }
    setDarkMode(updatedDarkMode);
  };

  return (
    <DarkModeProvider.Provider value={{ darkMode, setDarkMode: newDarkMode }}>
      { children }
    </DarkModeProvider.Provider>
  );
};

export const DarkModeProvider = createContext({
  darkMode: false,
  setDarkMode: (() => {
    throw new Error("No DarkModeProvider");
  }) as (_: boolean)=>void,
});

export default DarkModeContext;