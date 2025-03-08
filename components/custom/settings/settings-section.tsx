import React, { useState } from "react";
import NotificationBar from "./notification";
import Appearance from "./appearance";
import Account from "./account";
import Privacy from "./privacy";
import Help from "./help";

interface NotificationSettings {
  email: boolean;
  push: boolean;
  sms: boolean;
}

type ThemeOption = "light" | "dark" | "system";
type LanguageOption = "english" | "spanish" | "french" | "german" | "japanese";
type FontSizeOption = "small" | "medium" | "large";

const SettingsSection: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    sms: true,
  });

  const [theme, setTheme] = useState<ThemeOption>("light");
  const [language, setLanguage] = useState<LanguageOption>("english");
  const [fontSize, setFontSize] = useState<FontSizeOption>("medium");
  const [activeSection, setActiveSection] = useState<string>("notifications");

  const handleNotificationChange = (type: keyof NotificationSettings): void => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setTheme(e.target.value as ThemeOption);
  };

  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setLanguage(e.target.value as LanguageOption);
  };

  const handleFontSizeChange = (
    size: FontSizeOption
  ): void => {
    setFontSize(size);
  };

  const renderSectionContent = (): JSX.Element => {
    switch (activeSection) {
      case "notifications":
        return (
          <NotificationBar
            handleNotificationChange={handleNotificationChange}
            notifications={notifications}
          />
        );
      case "appearance":
        return (
          <Appearance 
            theme={theme}
            language={language}
            fontSize={fontSize}
            handleThemeChange={handleThemeChange}
            handleLanguageChange={handleLanguageChange}
            handleFontSizeChange={handleFontSizeChange}
          />
        );
      case "account":
        return <Account />;
      case "privacy":
        return <Privacy />;
      case "help":
        return <Help />;
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="inset-0 h-[35rem] bg-white dark:bg-gray-900 overflow-none rounded-lg">
      <div className="flex flex-col md:flex-row h-full">
        {/* Sidebar */}
        <div className="md:w-64 bg-gray-100 dark:bg-gray-800 p-4 md:p-6 flex flex-col">

          <nav className="space-y-1 flex-shrink-0">
            <button
              onClick={() => setActiveSection("notifications")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === "notifications"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span>Notifications</span>
            </button>
            <button
              onClick={() => setActiveSection("appearance")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === "appearance"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              <span>Appearance</span>
            </button>
            <button
              onClick={() => setActiveSection("account")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === "account"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Account</span>
            </button>
            <button
              onClick={() => setActiveSection("privacy")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === "privacy"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>Privacy</span>
            </button>
            <button
              onClick={() => setActiveSection("help")}
              className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeSection === "help"
                  ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Help & Support</span>
            </button>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3 px-4 py-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Log Out</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col p-4 md:p-6">
          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-800 dark:text-white">
              {activeSection === "notifications" && "Notification Preferences"}
              {activeSection === "appearance" && "Appearance Settings"}
              {activeSection === "account" && "Account Management"}
              {activeSection === "privacy" && "Privacy Controls"}
              {activeSection === "help" && "Help & Support"}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {activeSection === "notifications" &&
                "Manage how you receive notifications"}
              {activeSection === "appearance" &&
                "Customize your viewing experience"}
              {activeSection === "account" &&
                "Update your account information and security"}
              {activeSection === "privacy" && "Control your privacy settings"}
              {activeSection === "help" && "Get help with common issues"}
            </p>
          </div>

          <div className="flex-1 overflow-auto">
            {renderSectionContent()}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
            <button className="px-4 py-2 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg mr-3 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
            <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow-sm">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;