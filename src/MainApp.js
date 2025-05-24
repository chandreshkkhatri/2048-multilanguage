import React from 'react';
import { enableScreens } from 'react-native-screens';

import StoreProvider from './redux/StoreProvider.component';

import GameScreen from './screens/GameScreen.component';

enableScreens();

const MainApp = () => {
    return (
        <StoreProvider>
            <GameScreen />
        </StoreProvider>
    );
};

export default MainApp;
