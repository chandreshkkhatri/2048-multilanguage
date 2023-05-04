import { combineReducers } from 'redux';

import gameReducer from './reducers/game.reducer';

const rootReducer = combineReducers({
    game: gameReducer,
});

export default rootReducer;
