import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppTheme from './theme/AppTheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import StoreProvider from './redux/StoreProvider.component';
import GameScreen from './screens/GameScreen.component';

const MainApp = () => {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={AppTheme}>
                <StoreProvider>
                    <GameScreen />
                </StoreProvider>
            </PaperProvider>
        </SafeAreaProvider>
    );
};

export default MainApp;
