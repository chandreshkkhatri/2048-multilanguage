import { combineReducers } from '@reduxjs/toolkit';

import gameReducer from './reducers/game.reducer';

const rootReducer = combineReducers({
    game: gameReducer,
});

export default rootReducer;
