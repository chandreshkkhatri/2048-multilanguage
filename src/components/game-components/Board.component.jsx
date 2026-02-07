import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

import {
    makeMoveAction,
    gameOverAction,
} from '../../redux/actions/game.actions';

import Tile from '../game-components/Tile.component';

import { moveTypes, checkIsGameOver } from '../../utils/game.utils';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

const Board = () => {
    const boardState = useSelector((state) => state.game.board);

    const dispatch = useDispatch();

    const makeMove = (direction) =>
        dispatch(makeMoveAction(direction));

    useEffect(() => {
        const isGameOver = checkIsGameOver(boardState);
        if (isGameOver) dispatch(gameOverAction());
    }, [dispatch, boardState]);

    return (
        <GestureRecognizer
            onSwipeUp={() => makeMove(moveTypes.UP)}
            onSwipeDown={() => makeMove(moveTypes.DOWN)}
            onSwipeRight={() => makeMove(moveTypes.RIGHT)}
            onSwipeLeft={() => makeMove(moveTypes.LEFT)}
            style={styles.container}
            config={{ velocityThreshold: 0, directionalOffsetThreshold: 80 }}
        >
            {boardState.map((row, rowIndex) =>
                row.map((tile, colIndex) =>
                    tile ? (
                        <Tile key={`${rowIndex}-${colIndex}`} tileData={tile} />
                    ) : (
                        <Tile
                            key={`${rowIndex}-${colIndex}`}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                        />
                    )
                )
            )}
        </GestureRecognizer>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'relative',
        width: 374,
        maxWidth: 374,
        height: windowWidth - 40,
        maxHeight: 374,
        backgroundColor: Colors.board,
        borderRadius: 5,
    },
});

export default Board;
