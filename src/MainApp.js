import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ThemeProvider, useAppTheme } from './theme/ThemeContext';
import StoreProvider from './redux/StoreProvider.component';
import GameScreen from './screens/GameScreen.component';

const ThemedApp = () => {
    const { paperTheme } = useAppTheme();

    return (
        <PaperProvider theme={paperTheme}>
            <StoreProvider>
                <GameScreen />
            </StoreProvider>
        </PaperProvider>
    );
};

const MainApp = () => {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <ThemedApp />
            </ThemeProvider>
        </SafeAreaProvider>
    );
};

export default MainApp;
