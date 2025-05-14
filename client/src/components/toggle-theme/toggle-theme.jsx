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
      {theme == "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ToggleTheme;
