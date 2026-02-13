import cloneDeep from 'lodash/cloneDeep';

// Game Logic
export const createNewBoard = () => {
    let board = [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
    ];

    board = addNewTile(board);
    board = addNewTile(board);

    return board;
};

export const moveTypes = {
    UP: 'UP',
    DOWN: 'DOWN',
    RIGHT: 'RIGHT',
    LEFT: 'LEFT',
};

const BOARD_LENGTH = 4;

const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

export const checkIsGameOver = (board) => {
    for (let row = 0; row < board.length; row++)
        for (let col = 0; col < board[row].length; col++) {
            if (!board[row][col]) return false;

            if (row < board.length - 1)
                if (
                    board[row + 1][col] &&
                    board[row][col].number === board[row + 1][col].number
                )
                    return false;

            if (col < board[row].length - 1)
                if (
                    board[row][col + 1] &&
                    board[row][col].number === board[row][col + 1].number
                )
                    return false;
        }

    return true;
};

export const addNewTile = (board) => {
    const emptyCells = [];
    for (let row = 0; row < board.length; row++)
        for (let col = 0; col < board[row].length; col++)
            if (!board[row][col]) emptyCells.push({ row, column: col });

    if (emptyCells.length === 0) return board;

    const { row, column } = emptyCells[getRandomNumber(emptyCells.length) - 1];
    const updatedBoard = [...board];
    const tileNumber = getRandomNumber(10) > 1 ? 2 : 4;
    updatedBoard[row][column] = {
        number: tileNumber,
        currentPosition: { row, column },
        previousPosition: { row, column },
        isNew: true,
        isMerged: false,
    };

    return updatedBoard;
};

const isBoardEquals = (oldboard, updatedBoard) => {
    for (let row = 0; row < oldboard.length; row++) {
        for (let column = 0; column < oldboard[row].length; column++) {
            if (
                oldboard[row][column] === null &&
                updatedBoard[row][column] === null
            )
                continue;

            if (
                (oldboard[row][column] === null &&
                    updatedBoard[row][column] !== null) ||
                (oldboard[row][column] !== null &&
                    updatedBoard[row][column] === null)
            )
                return false;

            if (
                oldboard[row][column].number !==
                updatedBoard[row][column].number
            )
                return false;
        }
    }

    return true;
};

/**
 * Unified movement function for all 4 directions.
 *
 * @param {Array} oldBoard - The current board state
 * @param {Object} config - Direction configuration
 * @param {Array} config.outerRange - Indices for the outer loop (rows or columns)
 * @param {number} config.startPointer - Starting index for pointer1
 * @param {number} config.endPointer - Starting index for pointer2
 * @param {number} config.step - Direction of pointer movement (+1 or -1)
 * @param {Function} config.isInBounds - (pointer) => boolean
 * @param {Function} config.getCell - (outerIdx, pointer) => [row, col]
 * @param {Function} config.makePosition - (outerIdx, pointer) => {row, column}
 */
const moveTiles = (oldBoard, config) => {
    let updatedBoard = cloneDeep(oldBoard);
    let aggregatedScore = 0;

    const { outerRange, startPointer, endPointer, step, isInBounds, getCell, makePosition } = config;

    for (let i = 0; i < outerRange.length; i++) {
        const outer = outerRange[i];
        let pointer1 = startPointer;
        let pointer2 = endPointer;

        while (isInBounds(pointer1)) {
            if (!isInBounds(pointer2)) {
                pointer2 = pointer1 + step;
                pointer1 += step;
                continue;
            }

            const [r1, c1] = getCell(outer, pointer1);
            const [r2, c2] = getCell(outer, pointer2);
            const tile1 = updatedBoard[r1][c1];
            const tile2 = updatedBoard[r2][c2];

            if (tile1 === null && tile2 === null) {
                pointer2 += step;
                continue;
            }

            if (tile1 !== null && tile2 === null) {
                updatedBoard[r1][c1] = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                pointer2 += step;
                continue;
            }

            if (tile1 === null && tile2 !== null) {
                updatedBoard[r1][c1] = {
                    ...tile2,
                    currentPosition: makePosition(outer, pointer1),
                    previousPosition: makePosition(outer, pointer2),
                    isNew: false,
                    isMerged: false,
                };
                updatedBoard[r2][c2] = null;
                pointer2 += step;
                continue;
            }

            // Both tiles are non-null
            if (tile1.number === tile2.number) {
                const tileNum = tile1.number * 2;
                updatedBoard[r1][c1] = {
                    number: tileNum,
                    currentPosition: tile1.currentPosition,
                    previousPosition: tile2.currentPosition,
                    isNew: false,
                    isMerged: true,
                };
                updatedBoard[r2][c2] = null;
                aggregatedScore += tileNum;
                pointer2 = pointer1 + step;
                pointer1 += step;
                continue;
            }

            // Different numbers — mark both, advance
            updatedBoard[r1][c1] = {
                ...tile1,
                previousPosition: tile1.currentPosition,
                isNew: false,
                isMerged: false,
            };
            updatedBoard[r2][c2] = {
                ...tile2,
                previousPosition: tile2.currentPosition,
                isNew: false,
                isMerged: false,
            };
            pointer1 += step;
            pointer2 = pointer1 + step;
        }
    }

    if (!isBoardEquals(oldBoard, updatedBoard))
        updatedBoard = addNewTile(updatedBoard);

    return { updatedBoard, aggregatedScore };
};

// Direction configurations
const range = [0, 1, 2, 3];

const moveUp = (board) =>
    moveTiles(board, {
        outerRange: range,
        startPointer: 0,
        endPointer: 1,
        step: 1,
        isInBounds: (p) => p < BOARD_LENGTH,
        getCell: (col, ptr) => [ptr, col],
        makePosition: (col, ptr) => ({ row: ptr, column: col }),
    });

const moveDown = (board) =>
    moveTiles(board, {
        outerRange: range,
        startPointer: BOARD_LENGTH - 1,
        endPointer: BOARD_LENGTH - 2,
        step: -1,
        isInBounds: (p) => p >= 0,
        getCell: (col, ptr) => [ptr, col],
        makePosition: (col, ptr) => ({ row: ptr, column: col }),
    });

const moveLeft = (board) =>
    moveTiles(board, {
        outerRange: range,
        startPointer: 0,
        endPointer: 1,
        step: 1,
        isInBounds: (p) => p < BOARD_LENGTH,
        getCell: (row, ptr) => [row, ptr],
        makePosition: (row, ptr) => ({ row, column: ptr }),
    });

const moveRight = (board) =>
    moveTiles(board, {
        outerRange: range,
        startPointer: BOARD_LENGTH - 1,
        endPointer: BOARD_LENGTH - 2,
        step: -1,
        isInBounds: (p) => p >= 0,
        getCell: (row, ptr) => [row, ptr],
        makePosition: (row, ptr) => ({ row, column: ptr }),
    });

export const makeMove = (board, direction) => {
    switch (direction) {
        case moveTypes.UP:
            return moveUp(board);
        case moveTypes.DOWN:
            return moveDown(board);
        case moveTypes.RIGHT:
            return moveRight(board);
        default:
            return moveLeft(board);
    }
};
