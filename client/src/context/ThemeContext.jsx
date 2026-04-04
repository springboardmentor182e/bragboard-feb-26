import { createContext, useContext, useEffect, useState } from 'react';
import { settingsService } from '../services/settingsService';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  // Load theme from settings on mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const settings = await settingsService.getUserSettings();
        const savedTheme = settings.theme || 'light';
        setTheme(savedTheme);
        applyTheme(savedTheme);
      } catch (err) {
        console.error('Failed to load theme:', err);
        // Default to light theme if error
        applyTheme('light');
      } finally {
        setLoading(false);
      }
    };
    loadTheme();
  }, []);

  // Apply theme to the DOM
  const applyTheme = (themeValue) => {
    const html = document.documentElement;
    
    if (themeValue === 'system') {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    } else if (themeValue === 'dark') {
      html.classList.add('dark');
    } else {
      // light mode
      html.classList.remove('dark');
    }
  };

  // Change theme and save to backend
  const changeTheme = async (newTheme) => {
    try {
      // Apply immediately for better UX
      applyTheme(newTheme);
      setTheme(newTheme);
      
      // Save to backend
      await settingsService.updateUserSetting('theme', newTheme);
      console.log('✅ Theme changed to:', newTheme);
    } catch (err) {
      console.error('❌ Failed to change theme:', err);
      // Revert on error
      applyTheme(theme);
    }
  };

  // Watch for system preference changes when in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
};
