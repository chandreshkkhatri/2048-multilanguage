import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Platform } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';

import Card from '../UI-components/Card.component';

import * as UIUtils from '../../utils/UI.utils';
import { getTranslatedNumber } from '../../utils/i18n.utils';
import { TILE_SIZE, ANIMATION_DURATION, tilePosition as calcTilePos } from '../../constants/layout';

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
                top: calcTilePos(rowIndex),
                left: calcTilePos(colIndex),
            };
        }
    };

    let dynamicStyle = getDynamicStyles();

    if (tileData) {
        const { currentPosition, previousPosition, isNew, isMerged } = tileData;
        const targetX = calcTilePos(currentPosition.column);
        const targetY = calcTilePos(currentPosition.row);

        const shouldAnimate =
            isNew ||
            isMerged ||
            currentPosition.row !== previousPosition.row ||
            currentPosition.column !== previousPosition.column;

        if (shouldAnimate) {
            if (
                !isNew &&
                !isMerged &&
                (currentPosition.row !== previousPosition.row ||
                    currentPosition.column !== previousPosition.column)
            ) {
                const prevGridX = calcTilePos(previousPosition.column);
                const prevGridY = calcTilePos(previousPosition.row);
                tilePosition.setValue({ x: prevGridX, y: prevGridY });
            }

            Animated.timing(tilePosition, {
                toValue: { x: targetX, y: targetY },
                duration: ANIMATION_DURATION,
                useNativeDriver: Platform.OS !== 'web',
            }).start();
        } else {
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
        width: TILE_SIZE,
        height: TILE_SIZE,
    },
    emptyTile: {},
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileNumber: {},
});

export default Tile;
