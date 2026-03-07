// src/context/ThemeContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

// 1. Context create kiya
const ThemeContext = createContext();

// 2. Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Local storage se theme check karo, nahi toh 'light' default
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Jab bhi theme change ho, ye effect chalega
  useEffect(() => {
    // HTML root element par class add/remove karo
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Local storage mein save karo
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Theme toggle function
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Jo values hum provide kar rahe hain
  const value = {
    theme,
    toggleTheme,
    isDarkMode: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook - context use karne ke liye
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};