import { createContext, useEffect, useState } from "react";

const DarkModeContext = ({ children }: { children: JSX.Element }) => {
  const [darkMode, setDarkMode] = useState(
    sessionStorage.getItem("darkMode") === "dark",
  );

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  const newDarkMode = (updatedDarkMode: boolean) => {
    if (updatedDarkMode) {
      sessionStorage.setItem("darkMode", "dark");
    } else {
      sessionStorage.removeItem("darkMode");
    }
    setDarkMode(updatedDarkMode);
  };

  return (
    <DarkModeProvider.Provider value={{ darkMode, setDarkMode: newDarkMode }}>
      {children}
    </DarkModeProvider.Provider>
  );
};

export const DarkModeProvider = createContext({
  darkMode: false,
  setDarkMode: (() => {
    throw new Error("No DarkModeProvider");
  }) as (_: boolean) => void,
});

export default DarkModeContext;
