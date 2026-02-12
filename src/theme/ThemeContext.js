import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { LightColors, DarkColors } from '../constants/colors';
import { createAppTheme } from './AppTheme';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemScheme = useColorScheme();
    const [overrideMode, setOverrideMode] = useState(null);

    const isDark = overrideMode !== null
        ? overrideMode === 'dark'
        : systemScheme === 'dark';

    const colors = isDark ? DarkColors : LightColors;

    const paperTheme = useMemo(
        () => createAppTheme(colors, isDark),
        [isDark],
    );

    const toggleTheme = () => {
        setOverrideMode((prev) => {
            if (prev === null) return isDark ? 'light' : 'dark';
            return prev === 'dark' ? 'light' : 'dark';
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, paperTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAppTheme = () => useContext(ThemeContext);
