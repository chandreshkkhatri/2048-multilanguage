import React, { useRef, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

import { makeMoveAction } from '../../redux/actions/game.actions';

import Tile from '../game-components/Tile.component';
import useKeyboardControls from '../../hooks/useKeyboardControls';

import { moveTypes } from '../../utils/game.utils';
import { BOARD_SIZE, ANIMATION_DURATION } from '../../constants/layout';

const Board = () => {
    const theme = useTheme();
    const boardState = useSelector((state) => state.game.board);
    const dispatch = useDispatch();
    const isMoving = useRef(false);

    const makeMove = useCallback((direction) => {
        if (isMoving.current) return;
        isMoving.current = true;
        dispatch(makeMoveAction(direction));
        setTimeout(() => { isMoving.current = false; }, ANIMATION_DURATION + 80);
    }, [dispatch]);

    useKeyboardControls(makeMove, moveTypes);

    return (
        <GestureRecognizer
            onSwipeUp={() => makeMove(moveTypes.UP)}
            onSwipeDown={() => makeMove(moveTypes.DOWN)}
            onSwipeRight={() => makeMove(moveTypes.RIGHT)}
            onSwipeLeft={() => makeMove(moveTypes.LEFT)}
            style={[styles.container, { backgroundColor: theme.colors.board }]}
            config={{ velocityThreshold: 0.25, directionalOffsetThreshold: 80 }}
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
        width: BOARD_SIZE,
        height: BOARD_SIZE,
        borderRadius: 8,
    },
});

export default Board;
