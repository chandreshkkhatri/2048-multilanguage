import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider as PaperProvider } from 'react-native-paper';
import AppTheme from './theme/AppTheme'; // Import the custom theme

import StoreProvider from './redux/StoreProvider.component';
import GameScreen from './screens/GameScreen.component';

enableScreens();

const MainApp = () => {
    return (
        <PaperProvider theme={AppTheme}>
            <StoreProvider>
                <GameScreen />
            </StoreProvider>
        </PaperProvider>
    );
};

export default MainApp;
