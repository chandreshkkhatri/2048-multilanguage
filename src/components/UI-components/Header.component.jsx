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

    const mimicButtonPress = () => Alert.alert('Button Press', 'Button is not functional.', [{ text: 'okay' }]);

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
        <View style={styles.container}>
            <Logo containerStyle={styles.logo} textStyle={styles.logoText} />

            <View style={styles.content}>
                <View style={styles.scoreBoardsContainer}>
                    <ScoreBoard title={i18n.t('score')} score={gameScore} />

                    <ScoreBoard title={i18n.t('best')} score={bestGameScore} />
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: windowHeight * 0.17,
        maxWidth: 414,
        maxHeight: 150,
    },
    logo: {
        width: windowWidth * 0.27,
        height: windowWidth * 0.27,
    },
    logoText: {
        fontSize: windowWidth > 410 ? 40 : 32,
    },
    content: {
        justifyContent: 'space-between',
        width: '60%',
        height: '100%',
    },
    scoreBoardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '65%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '25%',
    },
    buttonContainer: {
        width: '45%',
        backgroundColor: Colors.button,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default Header;
