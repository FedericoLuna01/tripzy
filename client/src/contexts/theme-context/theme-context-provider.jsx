import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";

const themeValue = localStorage.getItem("theme");

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeValue);
  useEffect(() => {
    document.querySelector("#root").classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      document.querySelector("#root").classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.querySelector("#root").classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };
  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
