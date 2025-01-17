import { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeColors {
  light: { [key: string]: string };
  dark: { [key: string]: string };
}

const colors: ThemeColors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    primary: '#007AFF',
    secondary: '#5856D6',
  },
  dark: {
    background: '#000000',
    text: '#ffffff',
    primary: '#0A84FF',
    secondary: '#5E5CE6',
  }
};

export const useThemeColor = (
  colorName: keyof typeof colors.light, 
  fallback?: string
) => {
  const colorScheme = useColorScheme();
  
  const getColor = () => {
    const theme = colorScheme || 'light';
    return colors[theme][colorName] || fallback || colors[theme].text;
  };

  const [themeColor, setThemeColor] = useState(getColor());

  useEffect(() => {
    setThemeColor(getColor());
  }, [colorScheme, colorName]);

  // Required default export
  const UseThemeColor = () => themeColor;

  return UseThemeColor;
};

export default function ThemeColorHook() {
  return null;
}