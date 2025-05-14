import { useEffect, useState } from "react";
import { ThemeContext } from "./theme.context";

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");
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
  return (
    <ThemeContextProvider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContextProvider>
  );
};
