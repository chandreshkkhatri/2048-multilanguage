import React, { useState, useEffect } from 'react';
import { View, Alert, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { initGameAction } from '../../redux/actions/game.actions';

import Logo from './Logo.component';
import ScoreBoard from '../game-components/ScoreBoard.component';
import CustomButton from './CustomButton.component';

import * as gameStorage from '../../utils/storage.utils';

import Colors from '../../constants/colors';
import i18n from '../../services/internationalization/i18n';
import { getTranslatedNumber } from '../../utils/i18n.utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Board width constants for consistent layout
const BOARD_WIDTH = 374; // Updated to match Board.component.jsx actual width
const BOARD_MAX_WIDTH = 374; // Updated to match Board.component.jsx actual width

const Header = () => {
    const gameScore = useSelector((state) => state.game.score);

    const [bestGameScore, setBestGameScore] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentBestScore = async () => {
            const currentBestScore = await gameStorage.getBestGameScore();

            setBestGameScore(currentBestScore);
        };

        getCurrentBestScore();
    }, []);

    const mimicButtonPress = () =>
        Alert.alert('Button Press', 'Button is not functional.', [
            { text: 'okay' },
        ]);

    useEffect(() => {
        const updateBestScore = async () => {
            if (gameScore > bestGameScore) {
                await gameStorage.setBestGameScore(gameScore);
                setBestGameScore(gameScore);
            }
        };

        updateBestScore();
    }, [gameScore]);

    const initNewGame = () => dispatch(initGameAction());

    return (
        <View
            style={{
                width: BOARD_WIDTH,
                maxWidth: BOARD_MAX_WIDTH,
                alignSelf: 'center',
            }}
        >
            <View style={styles.topRow}>
                <Logo
                    containerStyle={styles.logo}
                    textStyle={styles.logoText}
                />

                <View style={styles.content}>
                    <View style={styles.scoreBoardsContainer}>
                        <ScoreBoard
                            title={i18n.t('score')}
                            score={getTranslatedNumber(gameScore)}
                        />

                        <ScoreBoard
                            title={i18n.t('best')}
                            score={getTranslatedNumber(bestGameScore)}
                        />
                    </View>

                    <View style={styles.buttonsContainer}>
                        <CustomButton
                            title={i18n.t('menu')}
                            onPressFunction={mimicButtonPress}
                            containerStyle={styles.buttonContainer}
                            textStyle={styles.buttonText}
                        />

                        <CustomButton
                            title={i18n.t('newGame')}
                            onPressFunction={initNewGame}
                            containerStyle={styles.buttonContainer}
                            textStyle={styles.buttonText}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topRow: {
        flexDirection: 'row', // Arrange logo and content side-by-side
        alignItems: 'center', // Vertically align logo and content if they have different heights
        width: '100%', // topRow takes the full width of its parent (which is BOARD_WIDTH)
        // Removed justifyContent: 'space-between' to rely on flex:1 for content expansion
    },
    logo: {
        width: 120, // Set to 120px as requested
        height: 150, // Set to 150px as requested
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    content: {
        flex: 1, // CRITICAL: This makes the content view expand to fill remaining horizontal space in topRow
        flexDirection: 'column', // Stack scoreBoardsContainer and buttonsContainer vertically
        // Removed justifyContent: 'space-between' and height: '100%'
        // Let height be intrinsic and children manage their vertical space.
        marginLeft: 15, // Increased space between logo and the content area
    },
    scoreBoardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes scoreboards to the ends of this container
        width: '100%', // Takes full width of the parent (content view)
        marginBottom: 12, // Increased space between scoreboards row and buttons row
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Pushes buttons to the ends of this container
        width: '100%', // Takes full width of the parent (content view)
    },
    buttonContainer: {
        // Style for each CustomButton's wrapper
        width: '46%', // Each button takes 46% of buttonsContainer width.
        // This leaves 8% of space in the middle, distributed by justifyContent.
    },
    buttonText: {
        fontSize: 16, // Consider reducing if text length causes buttons to be too wide
    },
    logoText: {
        fontSize: Dimensions.get('window').width > 410 ? 50 : 40, // Keeping previous font size, may need adjustment
    },
});

export default Header;
