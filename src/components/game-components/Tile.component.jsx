import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet } from 'react-native';

import Card from '../UI-components/Card.component';
import CustomText from '../UI-components/CustomText.component';

import * as UIUtils from '../../utils/UI.utils';
import { getTranslatedNumber } from '../../utils/i18n.utils';

import Colors from '../../constants/colors';

const Tile = ({ tileData, rowIndex, colIndex }) => {
    let style = tileData
        ? {
              ...styles.container,
              ...styles.tile,
              zIndex: 100,
              backgroundColor: UIUtils.getTileColor(tileData.number),
              borderRadius: 5,
          }
        : {
              ...styles.container,
              ...styles.emptyTile,
              top: rowIndex * 81 + (rowIndex + 1) * 10,
              left: colIndex * 81 + (colIndex + 1) * 10,
          };

    if (tileData) {
        const { currentPosition, previousPosition } = tileData;

        const { row: previousY, column: previousX } = previousPosition;

        const tilePosition = useRef(
            new Animated.ValueXY({ x: previousX * 81 + (previousX + 1) * 10, y: previousY * 81 + (previousY + 1) * 10 })
        ).current;

        const animateTile = () => {
            const { row: currentY, column: currentX } = currentPosition;

            const toValue = { x: currentX * 81 + (currentX + 1) * 10, y: currentY * 81 + (currentY + 1) * 10 };

            Animated.timing(tilePosition, {
                toValue,
                duration: 100,
                useNativeDriver: true,
            }).start();

            if (tileData.isNew) {
                const newTileAnimation = new Animated.Value(0);

                style.transform.push({ scale: newTileAnimation });

                return Animated.spring(newTileAnimation, {
                    toValue: 1,
                    duration: 150,
                    delay: 50,
                    useNativeDriver: true,
                }).start();
            }

            if (tileData.isMerged) {
                const movedTileAnimation = new Animated.Value(1.2);

                style.transform.push({ scale: movedTileAnimation });

                return Animated.timing(movedTileAnimation, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start();
            }
        };

        style = {
            ...style,
            transform: [...tilePosition.getTranslateTransform()],
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
        <Animated.View style={style}>
            <CustomText
                style={{
                    ...styles.tileNumber,
                    ...UIUtils.getTextStyle(tileData.number, Dimensions.get('window').width),
                }}
            >
                {getTranslatedNumber(tileData.number)}
            </CustomText>
        </Animated.View>
    ) : (
        <Card style={style}></Card>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: 80,
        height: 80,
    },
    emptyTile: {
        backgroundColor: Colors.emptyTile,
    },
    tile: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tileNumber: {
        fontSize: 48,
    },
});

export default Tile;
