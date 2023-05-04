import React from "react";
import { enableScreens } from "react-native-screens";

import StoreProvider from "./src/redux/StoreProvider.component";

import GameScreen from "./src/screens/GameScreen.component";


enableScreens();

const App = () => {
  return (
    <StoreProvider>
      <GameScreen />
    </StoreProvider>
  );
};

export default App;
