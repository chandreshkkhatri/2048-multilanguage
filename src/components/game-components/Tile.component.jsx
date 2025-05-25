import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';

import Card from '../UI-components/Card.component';

import * as UIUtils from '../../utils/UI.utils';
import { getTranslatedNumber } from '../../utils/i18n.utils';

const Tile = ({ tileData, rowIndex, colIndex }) => {
    const theme = useTheme();

    const tilePosition = useRef(new Animated.ValueXY()).current;

    const getDynamicStyles = () => {
        if (tileData) {
            return {
                ...styles.container,
                ...styles.tile,
                zIndex: 100,
                backgroundColor: UIUtils.getTileColor(tileData.number),
                borderRadius: theme.roundness,
            };
        } else {
            return {
                ...styles.container,
                ...styles.emptyTile,
                backgroundColor: theme.colors.emptyTile,
                borderRadius: theme.roundness,
                top: rowIndex * 81 + (rowIndex + 1) * 10,
                left: colIndex * 81 + (colIndex + 1) * 10,
            };
        }
    };

    let dynamicStyle = getDynamicStyles();

    if (tileData) {
        const { currentPosition, previousPosition, isNew, isMerged } = tileData;
        const targetX =
            currentPosition.column * 81 + (currentPosition.column + 1) * 10;
        const targetY =
            currentPosition.row * 81 + (currentPosition.row + 1) * 10;

        const shouldAnimate =
            isNew ||
            isMerged ||
            currentPosition.row !== previousPosition.row ||
            currentPosition.column !== previousPosition.column;

        if (shouldAnimate) {
            // If it's a pure move (not new, not merged), set the starting point for the animation
            // to its actual previous grid position.
            if (
                !isNew &&
                !isMerged &&
                (currentPosition.row !== previousPosition.row ||
                    currentPosition.column !== previousPosition.column)
            ) {
                const prevGridX =
                    previousPosition.column * 81 +
                    (previousPosition.column + 1) * 10;
                const prevGridY =
                    previousPosition.row * 81 + (previousPosition.row + 1) * 10;
                tilePosition.setValue({ x: prevGridX, y: prevGridY });
            }
            // For new or merged tiles, the animation will start from tilePosition's current value.
            // If this Tile component instance was previously an empty slot, tilePosition is likely {x:0, y:0},
            // so new tiles might appear to slide from the top-left. This change doesn't alter that specific animation
            // but focuses on fixing disappearing static tiles.

            Animated.timing(tilePosition, {
                toValue: { x: targetX, y: targetY },
                duration: 100,
                useNativeDriver: true,
            }).start();
        } else {
            // STATIC TILE: No animation is needed.
            // Explicitly set its position to ensure it's not rendered at an incorrect default (like 0,0).
            tilePosition.setValue({ x: targetX, y: targetY });
        }

        dynamicStyle = {
            ...dynamicStyle,
            transform: tilePosition.getTranslateTransform(),
        };
    }

    return tileData ? (
        <Animated.View style={dynamicStyle}>
            <PaperText
                style={{
                    ...styles.tileNumber,
                    ...UIUtils.getTextStyle(
                        tileData.number,
                        Dimensions.get('window').width
                    ),
                }}
            >
                {getTranslatedNumber(tileData.number)}
            </PaperText>
        </Animated.View>
    ) : (
        <Card style={dynamicStyle}></Card>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 80,
        height: 80,
    },
    emptyTile: {},
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileNumber: {},
});

export default Tile;
