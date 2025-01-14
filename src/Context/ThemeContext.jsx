import { createContext, useContext, useLayoutEffect, useState } from "react";

let themeContext = createContext();

export let GetTheme = () => useContext(themeContext);

export default function ThemeProvider({ children }) {
  let [theme, setTheme] = useState(
    () => localStorage.getItem("theme") ?? "system",
  );

  useLayoutEffect(() => {
    let darkMode =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : theme === "dark"
          ? true
          : false;
    document.documentElement.setAttribute("dark-mode", darkMode);
  }, [theme]);

  let changeTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  let value = { theme, changeTheme };
  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
}
