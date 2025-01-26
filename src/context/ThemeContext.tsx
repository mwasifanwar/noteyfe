import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  accentColor: string;
  compactView: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setAccentColor: (color: string) => void;
  setCompactView: (compact: boolean) => void;
  currentTheme: 'light' | 'dark'; // Resolved theme (after system preference)
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark' | 'system') || 'system';
  });
  
  const [accentColor, setAccentColor] = useState(() => {
    return localStorage.getItem('accentColor') || '#FF7AC4';
  });
  
  const [compactView, setCompactView] = useState(() => {
    return localStorage.getItem('compactView') === 'true';
  });

  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Save preferences to localStorage
    localStorage.setItem('theme', theme);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('compactView', String(compactView));

    // Apply theme
    const root = window.document.documentElement;
    
    // Determine theme based on system preference if set to 'system'
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setCurrentTheme(systemTheme);
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      setCurrentTheme(theme);
      root.classList.toggle('dark', theme === 'dark');
    }

    // Apply accent color
    root.style.setProperty('--accent-color', accentColor);
    root.style.setProperty('--accent-color-rgb', hexToRgb(accentColor));
  }, [theme, accentColor, compactView]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        setCurrentTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        accentColor, 
        compactView,
        setTheme, 
        setAccentColor, 
        setCompactView,
        currentTheme 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper function to convert hex to rgb
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 122, 196'; // Default pink
}