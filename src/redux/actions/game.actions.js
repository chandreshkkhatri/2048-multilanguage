import gameActionTypes from '../types/game.types';

export const initGameAction = () => ({
    type: gameActionTypes.INIT_GAME,
});

export const makeMoveAction = (direction) => ({
    type: gameActionTypes.MOVE,
    payload: {
        direction,
    },
});

export const gameOverAction = () => ({
    type: gameActionTypes.GAME_OVER,
});
