import { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference, then default to dark
    const savedTheme = localStorage.getItem('nexof-theme');
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark'; // Default to dark theme
  });

  const [isSystemTheme, setIsSystemTheme] = useState(() => {
    return !localStorage.getItem('nexof-theme');
  });

  useEffect(() => {
    const root = document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Apply current theme
    root.classList.add(theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#0f0f1a' : '#ffffff');
    }

    // Save to localStorage if not using system theme
    if (!isSystemTheme) {
      localStorage.setItem('nexof-theme', theme);
    } else {
      localStorage.removeItem('nexof-theme');
    }
  }, [theme, isSystemTheme]);

  // Listen for system theme changes when using system preference
  useEffect(() => {
    if (!isSystemTheme) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (e) => {
      setTheme(e.matches ? 'light' : 'dark');
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [isSystemTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    setIsSystemTheme(false);
  };

  const setThemeMode = (newTheme, useSystem = false) => {
    setTheme(newTheme);
    setIsSystemTheme(useSystem);
  };

  const value = {
    theme,
    toggleTheme,
    setThemeMode,
    isSystemTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};