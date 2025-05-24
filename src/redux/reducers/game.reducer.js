import gameActionTypes from '../types/game.types';

import { gameOverAction } from '../actions/game.actions';

import * as gameUtils from '../../utils/game.utils';

const GAME_INITIAL_STATE = {
    board: gameUtils.createNewBoard(),
    score: 0,
    isGameOver: false,
};

// Game Over State
// const GAME_INITIAL_STATE = {
//     board: [
//         [
//             {
//                 number: 4,
//                 currentPosition: { row: 0, column: 0 },
//                 previousPosition: { row: 0, column: 0 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 2,
//                 currentPosition: { row: 0, column: 1 },
//                 previousPosition: { row: 0, column: 1 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 4,
//                 currentPosition: { row: 0, column: 2 },
//                 previousPosition: { row: 0, column: 2 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 2,
//                 currentPosition: { row: 0, column: 3 },
//                 previousPosition: { row: 0, column: 3 },
//                 isNew: false,
//                 isMerged: false,
//             },
//         ],
//         [
//             {
//                 number: 2,
//                 currentPosition: { row: 1, column: 0 },
//                 previousPosition: { row: 1, column: 0 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 4,
//                 currentPosition: { row: 1, column: 1 },
//                 previousPosition: { row: 1, column: 1 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 2,
//                 currentPosition: { row: 1, column: 2 },
//                 previousPosition: { row: 1, column: 2 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 4,
//                 currentPosition: { row: 1, column: 3 },
//                 previousPosition: { row: 1, column: 3 },
//                 isNew: false,
//                 isMerged: false,
//             },
//         ],
//         [
//             {
//                 number: 4,
//                 currentPosition: { row: 2, column: 0 },
//                 previousPosition: { row: 2, column: 0 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 2,
//                 currentPosition: { row: 2, column: 1 },
//                 previousPosition: { row: 2, column: 1 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 4,
//                 currentPosition: { row: 2, column: 2 },
//                 previousPosition: { row: 2, column: 2 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 2,
//                 currentPosition: { row: 2, column: 3 },
//                 previousPosition: { row: 2, column: 3 },
//                 isNew: false,
//                 isMerged: false,
//             },
//         ],
//         [
//             {
//                 number: 4,
//                 currentPosition: { row: 3, column: 0 },
//                 previousPosition: { row: 3, column: 0 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             null,
//             {
//                 number: 2,
//                 currentPosition: { row: 3, column: 2 },
//                 previousPosition: { row: 3, column: 2 },
//                 isNew: false,
//                 isMerged: false,
//             },
//             {
//                 number: 4,
//                 currentPosition: { row: 3, column: 3 },
//                 previousPosition: { row: 3, column: 3 },
//                 isNew: false,
//                 isMerged: false,
//             },
//         ],
//     ],
//     score: 0,
//     isGameOver: false,
// };

const gameReducer = (gameState = GAME_INITIAL_STATE, action) => {
    switch (action.type) {
        case gameActionTypes.INIT_GAME:
            return { ...GAME_INITIAL_STATE, board: gameUtils.createNewBoard() };
        case gameActionTypes.MOVE:
            const { dispatch, direction } = action.payload;
            const board = gameState.board;

            const { updatedBoard, aggregatedScore } = gameUtils.makeMove(
                board,
                direction
            );

            return {
                ...gameState,
                board: updatedBoard,
                score: (gameState.score += aggregatedScore),
            };
        case gameActionTypes.GAME_OVER:
            return { ...gameState, isGameOver: true };
        default:
            return { ...gameState };
    }
};

export default gameReducer;
