import React from "react";

// These type definitions should match those from the parent component
type ThemeOption = "light" | "dark" | "system";
type LanguageOption = "english" | "spanish" | "french" | "german" | "japanese";
type FontSizeOption = "small" | "medium" | "large";

interface AppearanceProps {
  theme: ThemeOption;
  language: LanguageOption;
  fontSize: FontSizeOption;
  handleThemeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleFontSizeChange: (size: FontSizeOption) => void;
}

const Appearance: React.FC<AppearanceProps> = ({
  theme,
  language,
  fontSize,
  handleThemeChange,
  handleLanguageChange,
  handleFontSizeChange
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Theme
        </label>
        <select
          value={theme}
          onChange={handleThemeChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System Default</option>
        </select>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Language
        </label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200"
        >
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="french">French</option>
          <option value="german">German</option>
          <option value="japanese">Japanese</option>
        </select>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Font Size
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleFontSizeChange("small")}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition-all duration-200 ${
              fontSize === "small"
                ? "bg-indigo-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600"
            }`}
          >
            Small
          </button>
          <button
            onClick={() => handleFontSizeChange("medium")}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition-all duration-200 ${
              fontSize === "medium"
                ? "bg-indigo-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600"
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => handleFontSizeChange("large")}
            className={`flex-1 py-2 px-4 rounded-lg text-center transition-all duration-200 ${
              fontSize === "large"
                ? "bg-indigo-500 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-white border border-gray-200 dark:border-gray-600"
            }`}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
};

export default Appearance;