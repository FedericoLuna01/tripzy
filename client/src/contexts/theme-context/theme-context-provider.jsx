import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";

const themeValue = localStorage.getItem("theme");

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeValue);
  useEffect(() => {
    document.querySelector("#root").classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    const switchTheme = () => {
      const root = document.querySelector("#root");
      if (theme === "light") {
        root.classList.add("dark");
        root.classList.remove("light");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
      } else {
        root.classList.remove("dark");
        root.classList.add("light");
        localStorage.setItem("theme", "light");
        setTheme("light");
      }
    };

    if (!document.startViewTransition) {
      switchTheme();
    } else {
      document.startViewTransition(switchTheme);
    }
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
