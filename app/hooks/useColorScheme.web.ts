import { useEffect, useState } from 'react';

export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useState('light');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateColorScheme = (e) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    updateColorScheme(mediaQuery);

    mediaQuery.addEventListener('change', updateColorScheme);

    return () => {
      mediaQuery.removeEventListener('change', updateColorScheme);
    };
  }, []);

  return colorScheme;
}