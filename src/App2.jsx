import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function App2() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app-container">
      <h1>Theme Switcher App</h1>
      <p>Current Theme: <strong>{theme}</strong></p>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}

export default App2;
