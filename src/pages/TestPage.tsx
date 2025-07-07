import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const TestPage = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-darkBg text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Tailwind + Theme + Routing ✅</h1>

      <button
        onClick={toggleTheme}
        className="px-6 py-3 rounded-xl bg-primary text-white hover:brightness-90 transition"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default TestPage;
