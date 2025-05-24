import cloneDeep from 'lodash/cloneDeep';

import Tile from '../models/tile.model';

// Array Helper Functions
const transposeMatrix = (matrix, numOfTimes = 1) => {
    const rotate = () => {
        let result = [];

        for (let i = 0; i < matrix[0].length; i++) {
            let row = matrix.map((e) => e[i]).reverse();
            result.push(row);
        }

        return result;
    };

    let transposedMatrix;

    for (let i = 0; i < numOfTimes; i++) transposedMatrix = rotate();

    return transposedMatrix;
};

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

const getRandomNumber = (max) => Math.floor(Math.random() * max) + 1;

const canRenderATile = (board) => {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++)
            if (!board[row][col]) return true;
    }

    return false;
};

export const checkIsGameOver = (board) => {
    if (!canRenderATile(board)) return true;

    for (let row = 0; row < board.length; row++)
        for (let col = 0; col < board[row].length; col++) {
            if (!board[row][col]) return false;

            if (row < board.length - 1)
                if (
                    board[row + 1][col] &&
                    board[row][col].number === board[row + 1][col]
                )
                    return false;

            if (
                board[row][col + 1] &&
                board[row][col].number === board[row][col + 1]
            )
                return false;
        }

    return true;
};

export const addNewTile = (board) => {
    const row = getRandomNumber(4) - 1;
    const column = getRandomNumber(4) - 1;
    const randomTile = board[row][column];

    if (randomTile) return addNewTile(board);

    const updatedBoard = [...board];
    const tileNumber = getRandomNumber(1) > 0 ? 2 : 4;
    updatedBoard[row][column] = new Tile(tileNumber, { row, column });

    return updatedBoard;
};

const isBoardEquales = (oldboard, updatedBoard) => {
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

const moveUp = (oldBoard) => {
    let updatedBoard = cloneDeep(oldBoard);
    let aggregatedScore = 0;

    for (let colIndex = 0; colIndex < updatedBoard.length; colIndex++) {
        let pointer1 = 0,
            pointer2 = 1;

        while (pointer1 < updatedBoard.length) {
            if (pointer2 === updatedBoard.length) {
                pointer2 = pointer1 + 1;
                pointer1++;
                continue;
            }

            let tile1 = updatedBoard[pointer1][colIndex];
            let tile2 = updatedBoard[pointer2][colIndex];

            if (tile1 === null && tile2 === null) {
                pointer2++;
                continue;
            }

            if (tile1 !== null && tile2 === null) {
                const tileData = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                updatedBoard[pointer1][colIndex] = tileData;

                pointer2++;
                continue;
            }

            if (tile1 === null && tile2 !== null) {
                const tileData = {
                    ...tile2,
                    currentPosition: { row: pointer1, column: colIndex },
                    previousPosition: { row: pointer2, column: colIndex },
                    isNew: false,
                    isMerged: false,
                };

                updatedBoard[pointer1][colIndex] = tileData;
                updatedBoard[pointer2][colIndex] = null;
                pointer2++;
                continue;
            }

            if (tile1 !== null && tile2 !== null) {
                if (tile1.number === tile2.number) {
                    const tileNum = tile1.number * 2;

                    const tileData = {
                        number: tileNum,
                        currentPosition: tile1.currentPosition,
                        previousPosition: tile2.currentPosition,
                        isNew: false,
                        isMerged: true,
                    };

                    updatedBoard[pointer1][colIndex] = tileData;
                    updatedBoard[pointer2][colIndex] = null;
                    aggregatedScore += tileNum;
                    pointer2 = pointer1 + 1;
                    pointer1++;
                    continue;
                }

                const tile1Data = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                const tile2Data = {
                    ...tile2,
                    previousPosition: tile2.currentPosition,
                    isNew: false,
                    isMerged: false,
                };

                updatedBoard[pointer1][colIndex] = tile1Data;
                updatedBoard[pointer2][colIndex] = tile2Data;

                pointer1++;
                pointer2 = pointer1 + 1;
                continue;
            }
        }
    }

    if (!isBoardEquales(oldBoard, updatedBoard))
        updatedBoard = addNewTile(updatedBoard);

    return { updatedBoard, aggregatedScore };
};

const moveDown = (oldBoard) => {
    let updatedBoard = cloneDeep(oldBoard);
    let aggregatedScore = 0;

    for (let colIndex = updatedBoard.length - 1; colIndex >= 0; colIndex--) {
        let pointer1 = updatedBoard.length - 1,
            pointer2 = pointer1 - 1;

        while (pointer1 > 0) {
            if (pointer2 === -1) {
                pointer2 = pointer1 - 1;
                pointer1--;
                continue;
            }

            let tile1 = updatedBoard[pointer1][colIndex];
            let tile2 = updatedBoard[pointer2][colIndex];

            if (tile1 === null && tile2 === null) {
                pointer2--;
                continue;
            }

            if (tile1 !== null && tile2 === null) {
                const tileData = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                updatedBoard[pointer1][colIndex] = tileData;

                pointer2--;
                continue;
            }

            if (tile1 === null && tile2 !== null) {
                const tileData = {
                    ...tile2,
                    currentPosition: { row: pointer1, column: colIndex },
                    previousPosition: { row: pointer2, column: colIndex },
                    isNew: false,
                    isMerged: false,
                };

                updatedBoard[pointer1][colIndex] = tileData;
                updatedBoard[pointer2][colIndex] = null;
                pointer2--;
                continue;
            }

            if (tile1 !== null && tile2 !== null) {
                if (tile1.number === tile2.number) {
                    const tileNum = tile1.number * 2;

                    const tileData = {
                        number: tileNum,
                        currentPosition: tile1.currentPosition,
                        previousPosition: tile2.currentPosition,
                        isNew: false,
                        isMerged: true,
                    };

                    updatedBoard[pointer1][colIndex] = tileData;
                    updatedBoard[pointer2][colIndex] = null;
                    aggregatedScore += tileNum;
                    pointer2 = pointer1 - 1;
                    pointer1--;
                    continue;
                }

                const tile1Data = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                const tile2Data = {
                    ...tile2,
                    previousPosition: tile2.currentPosition,
                    isNew: false,
                    isMerged: false,
                };

                updatedBoard[pointer1][colIndex] = tile1Data;
                updatedBoard[pointer2][colIndex] = tile2Data;

                pointer1--;
                pointer2 = pointer1 - 1;
                continue;
            }
        }
    }

    if (!isBoardEquales(oldBoard, updatedBoard))
        updatedBoard = addNewTile(updatedBoard);

    return { updatedBoard, aggregatedScore };
};

const moveRight = (oldBoard) => {
    let updatedBoard = cloneDeep(oldBoard);
    let aggregatedScore = 0;

    for (let rowIndex = updatedBoard.length - 1; rowIndex >= 0; rowIndex--) {
        const row = updatedBoard[rowIndex];
        let pointer1 = updatedBoard.length - 1,
            pointer2 = pointer1 - 1;

        while (pointer1 > 0) {
            if (pointer2 === -1) {
                pointer2 = pointer1 - 1;
                pointer1--;
                continue;
            }

            let tile1 = row[pointer1];
            let tile2 = row[pointer2];

            if (tile1 === null && tile2 === null) {
                pointer2--;
                continue;
            }

            if (tile1 !== null && tile2 === null) {
                const tileData = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                row[pointer1] = tileData;

                pointer2--;
                continue;
            }

            if (tile1 === null && tile2 !== null) {
                const tileData = {
                    ...tile2,
                    currentPosition: { row: rowIndex, column: pointer1 },
                    previousPosition: { row: rowIndex, column: pointer2 },
                    isNew: false,
                    isMerged: false,
                };

                row[pointer1] = tileData;
                row[pointer2] = null;
                pointer2--;
                continue;
            }

            if (tile1 !== null && tile2 !== null) {
                if (tile1.number === tile2.number) {
                    const tileNum = tile1.number * 2;

                    const tileData = {
                        number: tileNum,
                        currentPosition: tile1.currentPosition,
                        previousPosition: tile2.currentPosition,
                        isNew: false,
                        isMerged: true,
                    };

                    row[pointer1] = tileData;
                    row[pointer2] = null;
                    aggregatedScore += tileNum;
                    pointer2 = pointer1 - 1;
                    pointer1--;
                    continue;
                }

                const tile1Data = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                const tile2Data = {
                    ...tile2,
                    previousPosition: tile2.currentPosition,
                    isNew: false,
                    isMerged: false,
                };

                row[pointer1] = tile1Data;
                row[pointer2] = tile2Data;

                pointer1--;
                pointer2 = pointer1 - 1;
                continue;
            }
        }
    }

    if (!isBoardEquales(oldBoard, updatedBoard))
        updatedBoard = addNewTile(updatedBoard);

    return { updatedBoard, aggregatedScore };
};

const moveLeft = (oldBoard) => {
    let updatedBoard = cloneDeep(oldBoard);
    let aggregatedScore = 0;

    for (let rowIndex = 0; rowIndex < updatedBoard.length; rowIndex++) {
        const row = updatedBoard[rowIndex];
        let pointer1 = 0,
            pointer2 = 1;

        while (pointer1 < updatedBoard.length) {
            if (pointer2 === updatedBoard.length) {
                pointer2 = pointer1 + 1;
                pointer1++;
                continue;
            }

            let tile1 = row[pointer1];
            let tile2 = row[pointer2];

            if (tile1 === null && tile2 === null) {
                pointer2++;
                continue;
            }

            if (tile1 !== null && tile2 === null) {
                const tileData = {
                    ...tile1,
                    previousPosition: { ...tile1.currentPosition },
                    isNew: false,
                    isMerged: false,
                };

                row[pointer1] = tileData;

                pointer2++;
                continue;
            }

            if (tile1 === null && tile2 !== null) {
                const tileData = {
                    ...tile2,
                    currentPosition: { row: rowIndex, column: pointer1 },
                    previousPosition: { row: rowIndex, column: pointer2 },
                    isNew: false,
                    isMerged: false,
                };

                row[pointer1] = tileData;
                row[pointer2] = null;
                pointer2++;
                continue;
            }

            if (tile1 !== null && tile2 !== null) {
                if (tile1.number === tile2.number) {
                    const tileNum = tile1.number * 2;

                    const tileData = {
                        number: tileNum,
                        currentPosition: tile1.currentPosition,
                        previousPosition: tile2.currentPosition,
                        isNew: false,
                        isMerged: true,
                    };

                    row[pointer1] = tileData;
                    row[pointer2] = null;
                    aggregatedScore += tileNum;
                    pointer2 = pointer1 + 1;
                    pointer1++;
                    continue;
                }

                const tile1Data = {
                    ...tile1,
                    previousPosition: tile1.currentPosition,
                    isNew: false,
                    isMerged: false,
                };
                const tile2Data = {
                    ...tile2,
                    previousPosition: tile2.currentPosition,
                    isNew: false,
                    isMerged: false,
                };

                row[pointer1] = tile1Data;
                row[pointer2] = tile2Data;

                pointer1++;
                pointer2 = pointer1 + 1;
                continue;
            }
        }
    }

    if (!isBoardEquales(oldBoard, updatedBoard))
        updatedBoard = addNewTile(updatedBoard);

    return { updatedBoard, aggregatedScore };
};

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
