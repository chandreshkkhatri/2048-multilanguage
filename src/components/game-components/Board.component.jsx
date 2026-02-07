import React, { useRef, useCallback } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';

import { makeMoveAction } from '../../redux/actions/game.actions';

import Tile from '../game-components/Tile.component';
import useKeyboardControls from '../../hooks/useKeyboardControls';

import { moveTypes } from '../../utils/game.utils';
import { BOARD_SIZE, ANIMATION_DURATION } from '../../constants/layout';
import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

const Board = () => {
    const boardState = useSelector((state) => state.game.board);
    const dispatch = useDispatch();
    const isMoving = useRef(false);

    const makeMove = useCallback((direction) => {
        if (isMoving.current) return;
        isMoving.current = true;
        dispatch(makeMoveAction(direction));
        setTimeout(() => { isMoving.current = false; }, ANIMATION_DURATION + 20);
    }, [dispatch]);

    useKeyboardControls(makeMove, moveTypes);

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
        width: BOARD_SIZE,
        maxWidth: BOARD_SIZE,
        height: windowWidth - 40,
        maxHeight: BOARD_SIZE,
        backgroundColor: Colors.board,
        borderRadius: 8,
    },
});

export default Board;
