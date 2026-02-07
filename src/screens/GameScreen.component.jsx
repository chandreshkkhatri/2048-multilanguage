import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, Text as PaperText } from 'react-native-paper';

import { initGameAction } from '../redux/actions/game.actions';

import Header from '../components/UI-components/Header.component';

import Board from '../components/game-components/Board.component';
import GameOverModal from '../components/UI-components/GameOverModal.component';

import Colors from '../constants/colors';
import { BOARD_SIZE } from '../constants/layout';
import i18n, { detectedLocale } from '../services/internationalization/i18n';
import { Locale } from '../commons/types/i18n';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GameScreen = () => {
    const isGameOver = useSelector((state) => state.game.isGameOver);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(detectedLocale);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isGameOver) setModalVisibility(true);
    }, [isGameOver]);

    const closeModal = () => {
        dispatch(initGameAction());
        setModalVisibility(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Surface style={styles.container}>
                <View style={styles.mainContent}>
                    <Header />

                    <View style={styles.instructionsContainer}>
                        <PaperText style={styles.instructionsText}>
                            {i18n.t('instructionsText')}
                        </PaperText>
                    </View>

                    <View style={styles.boardContainer}>
                        <Board />
                    </View>
                </View>

                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedLanguage}
                        onValueChange={(itemValue, itemIndex) => {
                            i18n.locale = itemValue;
                            setSelectedLanguage(itemValue);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item
                            label="Sanskrut - संस्कृत"
                            value={Locale.sanskrut}
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="Hindi - हिंदी"
                            value={Locale.hindi}
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="Marathi - मराठी"
                            value={Locale.marathi}
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="Punjabi - ਪੰਜਾਬੀ"
                            value={Locale.punjabi}
                            style={styles.pickerItem}
                        />
                        <Picker.Item
                            label="English - English"
                            value={Locale.english}
                            style={styles.pickerItem}
                        />
                    </Picker>
                </View>

                <View style={styles.footer}>
                    <PaperText style={styles.footerText}>
                        {i18n.t('developedBy')}
                    </PaperText>
                </View>

                <GameOverModal
                    visible={modalVisibility}
                    onPressFunction={closeModal}
                />
            </Surface>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: windowHeight * 0.03,
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    instructionsContainer: {
        width: BOARD_SIZE,
        maxWidth: BOARD_SIZE,
        alignSelf: 'center',
        marginVertical: 4,
    },
    instructionsText: {
        fontSize: windowWidth > 410 ? 18 : 16,
        textAlign: 'center',
    },
    boardContainer: {
        alignItems: 'center',
        width: BOARD_SIZE,
        maxWidth: BOARD_SIZE,
        alignSelf: 'center',
        marginVertical: windowHeight * 0.01,
    },
    pickerContainer: {
        marginTop: windowHeight * 0.01,
        marginBottom: windowHeight * 0.005,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.text,
        borderRadius: 8,
        width: windowWidth * 0.6,
        maxWidth: 250,
    },
    picker: {
        width: '100%',
    },
    pickerItem: {
        textAlign: 'center',
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 414,
        paddingVertical: windowHeight * 0.005,
    },
    footerText: {},
});

export default GameScreen;
