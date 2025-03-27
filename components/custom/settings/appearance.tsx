import React from "react";

// Updated type definitions
type FontSizeOption = "small" | "medium" | "large";

// Font size preview values
const fontSizePreviewText: Record<FontSizeOption, string> = {
  small: "14px",
  medium: "16px",
  large: "20px"
};

interface AppearanceProps {
  fontSize: FontSizeOption;
  handleFontSizeChange: (size: FontSizeOption) => void;
}

const Appearance: React.FC<AppearanceProps> = ({
  fontSize,
  handleFontSizeChange
}) => {
  return (
    <div className="space-y-6">
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