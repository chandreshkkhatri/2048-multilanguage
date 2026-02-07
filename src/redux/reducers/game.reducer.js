import gameActionTypes from '../types/game.types';

import * as gameUtils from '../../utils/game.utils';

const GAME_INITIAL_STATE = {
    board: gameUtils.createNewBoard(),
    score: 0,
    isGameOver: false,
};

const gameReducer = (gameState = GAME_INITIAL_STATE, action) => {
    switch (action.type) {
        case gameActionTypes.INIT_GAME:
            return { ...GAME_INITIAL_STATE, board: gameUtils.createNewBoard() };
        case gameActionTypes.MOVE:
            const { direction } = action.payload;
            const { updatedBoard, aggregatedScore } = gameUtils.makeMove(
                gameState.board,
                direction
            );

            return {
                ...gameState,
                board: updatedBoard,
                score: gameState.score + aggregatedScore,
                isGameOver: gameUtils.checkIsGameOver(updatedBoard),
            };
        default:
            return { ...gameState };
    }
};

export default gameReducer;
