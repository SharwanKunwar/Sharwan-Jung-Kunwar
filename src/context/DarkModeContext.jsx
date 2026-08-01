import { useEffect, useState } from 'react';
import { DarkModeContext } from './DarkModeContext.js';

const getInitialDarkMode = () => {
  if (typeof window === 'undefined') return false;

  const savedTheme = window.localStorage.getItem('theme');
  return savedTheme === 'dark' || (
    !savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
};

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((currentMode) => !currentMode);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
