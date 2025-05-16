import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";

const themeValue = localStorage.getItem("theme");

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(themeValue);
  const body = document.body;
  useEffect(() => {
    body.classList.add(theme);
  }, [theme, body]);

  const toggleTheme = () => {
    const switchTheme = () => {
      if (theme === "dark") {
        body.classList.remove("dark");
        localStorage.removeItem("theme");
        setTheme("light");
      } else {
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setTheme("dark");
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
