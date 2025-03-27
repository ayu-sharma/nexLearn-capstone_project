"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// User interfaces
interface User {
  _id: string;
  name: string;
  email: string;
}

// Theme interfaces
type ThemeOption = "light" | "dark" | "system";
type LanguageOption = "english" | "spanish" | "french" | "german" | "japanese";
type FontSizeOption = "small" | "medium" | "large";

// Combined context interface
interface AppContextType {
  // User state
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  
  // Theme state
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
  language: LanguageOption;
  setLanguage: (language: LanguageOption) => void;
  fontSize: FontSizeOption;
  setFontSize: (fontSize: FontSizeOption) => void;
  isDarkMode: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // User state
  const [token, setTokenState] = useState<string | null>(() => 
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [user, setUser] = useState<User | null>(null);

  // Theme state
  const [theme, setThemeState] = useState<ThemeOption>(() => 
    typeof window !== "undefined" 
      ? (localStorage.getItem("theme") as ThemeOption) || "light"
      : "light"
  );
  
  const [language, setLanguageState] = useState<LanguageOption>(() => 
    typeof window !== "undefined" 
      ? (localStorage.getItem("language") as LanguageOption) || "english"
      : "english"
  );
  
  const [fontSize, setFontSizeState] = useState<FontSizeOption>(() => 
    typeof window !== "undefined" 
      ? (localStorage.getItem("fontSize") as FontSizeOption) || "medium"
      : "medium"
  );

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // User methods
  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  // Theme methods
  const setTheme = (newTheme: ThemeOption) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const setLanguage = (newLanguage: LanguageOption) => {
    setLanguageState(newLanguage);
    localStorage.setItem("language", newLanguage);
  };

  const setFontSize = (newFontSize: FontSizeOption) => {
    setFontSizeState(newFontSize);
    localStorage.setItem("fontSize", newFontSize);
  };

  // User effect - fetch user data when token changes
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    axios.get("http://localhost:3000/api/user/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      const { name, email, _id } = response.data.details;
      setUser({ name, email, _id });
      localStorage.setItem("cId", response.data.lastViewed);
    })
    .catch(err => {
      console.error("Error fetching user: " + err);
      setUser(null);
    });
  }, [token]);

  // Theme effect - apply theme settings to document
  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    
    // Handle dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldApplyDark = theme === "dark" || (theme === "system" && prefersDark);
    
    setIsDarkMode(shouldApplyDark);
    
    if (shouldApplyDark) {
      root.classList.add("dark");
      document.body.classList.add("dark:bg-gray-900");
    } else {
      root.classList.remove("dark");
      document.body.classList.remove("dark:bg-gray-900");
    }

    // Apply font size to html element
    root.style.fontSize = 
      fontSize === "small" ? "14px" : 
      fontSize === "large" ? "18px" : 
      "16px";
  }, [theme, fontSize]);

  return (
    <AppContext.Provider
      value={{
        // User state and methods
        user,
        setUser,
        token,
        setToken,
        logout,
        
        // Theme state and methods
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        isDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};