import React, { useRef, useEffect } from 'react';
import { Animated, Dimensions, StyleSheet, Platform } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';

import Card from '../UI-components/Card.component';

import * as UIUtils from '../../utils/UI.utils';
import { getTranslatedNumber } from '../../utils/i18n.utils';
import { TILE_SIZE, ANIMATION_DURATION, tilePosition as calcTilePos } from '../../constants/layout';

const Tile = ({ tileData, rowIndex, colIndex }) => {
    const theme = useTheme();
    const tilePosition = useRef(new Animated.ValueXY()).current;

    useEffect(() => {
        if (!tileData) return;

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

            const anim = Animated.timing(tilePosition, {
                toValue: { x: targetX, y: targetY },
                duration: ANIMATION_DURATION,
                useNativeDriver: Platform.OS !== 'web',
            });
            anim.start();
            return () => anim.stop();
        } else {
            tilePosition.setValue({ x: targetX, y: targetY });
        }
    }, [tileData]);

    if (!tileData) {
        const emptyStyle = {
            ...styles.container,
            ...styles.emptyTile,
            backgroundColor: theme.colors.emptyTile,
            borderRadius: theme.roundness,
            top: calcTilePos(rowIndex),
            left: calcTilePos(colIndex),
        };
        return <Card style={emptyStyle}></Card>;
    }

    const tileStyle = {
        ...styles.container,
        ...styles.tile,
        zIndex: 100,
        backgroundColor: UIUtils.getTileColor(tileData.number),
        borderRadius: theme.roundness,
        transform: tilePosition.getTranslateTransform(),
    };

    return (
        <Animated.View style={tileStyle}>
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
