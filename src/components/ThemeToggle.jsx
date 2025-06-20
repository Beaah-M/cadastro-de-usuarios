import React from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  const toggleTheme = () => {
    setDarkMode((prevTheme) => !prevTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="w-6 h-6 text-yellow-500" />
      ) : (
        <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
}
