import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/theme-context/theme.context";
import { Moon, Sun } from "phosphor-react";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      className="button button-outline button-square"
      onClick={toggleTheme}
    >
      {theme == "dark" ? <Sun size={22} /> : <Moon size={22} />}
    </button>
  );
};

export default ToggleTheme;
