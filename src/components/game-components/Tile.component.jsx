import React, { useRef } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';

import Card from '../UI-components/Card.component';

import * as UIUtils from '../../utils/UI.utils';
import { getTranslatedNumber } from '../../utils/i18n.utils';

const Tile = ({ tileData, rowIndex, colIndex }) => {
    const theme = useTheme();

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
        const { currentPosition, previousPosition } = tileData;
        const { row: previousY, column: previousX } = previousPosition;

        const tilePosition = useRef(
            new Animated.ValueXY({
                x: previousX * 81 + (previousX + 1) * 10,
                y: previousY * 81 + (previousY + 1) * 10,
            })
        ).current;

        const animateTile = () => {
            const { row: currentY, column: currentX } = currentPosition;
            const toValue = {
                x: currentX * 81 + (currentX + 1) * 10,
                y: currentY * 81 + (currentY + 1) * 10,
            };

            Animated.timing(tilePosition, {
                toValue,
                duration: 100,
                useNativeDriver: true,
            }).start();
        };

        dynamicStyle = {
            ...dynamicStyle,
            transform: tilePosition.getTranslateTransform(),
        };

        if (
            currentPosition.row !== previousPosition.row ||
            currentPosition.column !== previousPosition.column ||
            tileData.isNew ||
            tileData.isMerged
        ) {
            animateTile();
        }
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
