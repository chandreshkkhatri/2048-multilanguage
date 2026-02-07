import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { initGameAction } from '../../redux/actions/game.actions';

import Logo from './Logo.component';
import ScoreBoard from '../game-components/ScoreBoard.component';
import CustomButton from './CustomButton.component';

import * as gameStorage from '../../utils/storage.utils';

import { BOARD_SIZE } from '../../constants/layout';
import i18n from '../../services/internationalization/i18n';
import { getTranslatedNumber } from '../../utils/i18n.utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

    useEffect(() => {
        const updateBestScore = async () => {
            if (gameScore > bestGameScore) {
                await gameStorage.setBestGameScore(gameScore);
                setBestGameScore(gameScore);
            }
        };

        updateBestScore();
    }, [gameScore, bestGameScore]);

    const initNewGame = () => dispatch(initGameAction());

    return (
        <View
            style={{
                width: BOARD_SIZE,
                maxWidth: BOARD_SIZE,
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
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        width: 120,
        height: windowHeight * 0.15,
        maxHeight: 120,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 15,
    },
    scoreBoardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: windowHeight * 0.01,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
    },
    buttonText: {
        fontSize: windowWidth > 360 ? 16 : 14,
    },
    logoText: {
        fontSize: windowWidth > 360 ? (windowHeight > 600 ? 40 : 35) : 30,
    },
});

export default Header;
