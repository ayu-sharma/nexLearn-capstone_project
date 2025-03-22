import React, { useState, useEffect } from "react";

// Updated type definitions
type LanguageOption = "english" | "spanish" | "french" | "german" | "japanese";
type FontSizeOption = "small" | "medium" | "large";

// Display names mapping for languages
const languageDisplayNames: Record<LanguageOption, string> = {
  english: "English",
  spanish: "Español",
  french: "Français",
  german: "Deutsch",
  japanese: "日本語"
};

// Font size preview values
const fontSizePreviewText: Record<FontSizeOption, string> = {
  small: "14px",
  medium: "16px",
  large: "20px"
};

interface AppearanceProps {
  language: LanguageOption;
  fontSize: FontSizeOption;
  handleLanguageChange: (language: LanguageOption) => void;
  handleFontSizeChange: (size: FontSizeOption) => void;
}

const Appearance: React.FC<AppearanceProps> = ({
  language,
  fontSize,
  handleLanguageChange,
  handleFontSizeChange
}) => {
  // State for language search
  const [searchQuery, setSearchQuery] = useState("");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Filtered languages based on search
  const filteredLanguages = Object.entries(languageDisplayNames)
    .filter(([key, name]) => 
      name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      key.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(([key]) => key as LanguageOption);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowLanguageDropdown(false);
    };

    if (showLanguageDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showLanguageDropdown]);

  // Handle language selection
  const selectLanguage = (lang: LanguageOption) => {
    handleLanguageChange(lang);
    setShowLanguageDropdown(false);
    setSearchQuery("");
  };

  return (
    <div className="space-y-6">
      {/* Language Selector with Search */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Language
        </label>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowLanguageDropdown(!showLanguageDropdown);
            }}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-all duration-200 text-left flex justify-between items-center"
          >
            <span>{languageDisplayNames[language]}</span>
            <svg 
              className={`w-5 h-5 transition-transform ${showLanguageDropdown ? "transform rotate-180" : ""}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {showLanguageDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto">
                {filteredLanguages.length > 0 ? (
                  filteredLanguages.map((lang) => (
                    <li 
                      key={lang} 
                      onClick={() => selectLanguage(lang)}
                      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 ${language === lang ? "bg-indigo-100 dark:bg-indigo-900" : ""}`}
                    >
                      {languageDisplayNames[lang]}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 dark:text-gray-400">No languages found</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Font Size Selector with Preview */}
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Font Size
        </label>
        <div className="flex flex-col space-y-4">
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
          
          {/* Font size preview */}
          <div className="mt-2 p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700">
            <p className="text-gray-700 dark:text-gray-200 text-center font-medium mb-1">Preview</p>
            <p 
              className="text-gray-600 dark:text-gray-300" 
              style={{ fontSize: fontSizePreviewText[fontSize] }}
            >
              This is how your text will appear with the selected font size ({fontSizePreviewText[fontSize]}).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearance;