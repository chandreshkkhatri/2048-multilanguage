import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, SafeAreaView, View } from 'react-native'; // Added SafeAreaView and View
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, Text as PaperText } from 'react-native-paper'; // Added Surface and PaperText

import { initGameAction } from '../redux/actions/game.actions';

import Header from '../components/UI-components/Header.component';
// import CustomText from '../components/UI-components/CustomText.component'; // Replaced with PaperText
import Board from '../components/game-components/Board.component';
import GameOverModal from '../components/UI-components/GameOverModal.component';

import Colors from '../constants/colors';
import i18n from '../services/internationalization/i18n';
import { Locale } from '../commons/types/i18n';

const windowWidth = Dimensions.get('window').width;

const GameScreen = () => {
    const isGameOver = useSelector((state) => state.game.isGameOver);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(Locale.sanskrut);

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
                        />
                        <Picker.Item
                            label="Hindi - हिंदी"
                            value={Locale.hindi}
                        />
                        <Picker.Item
                            label="Marathi - मराठी"
                            value={Locale.marathi}
                        />
                        <Picker.Item
                            label="Punjabi - ਪੰਜਾਬੀ"
                            value={Locale.punjabi}
                        />
                        <Picker.Item
                            label="English - English"
                            value={Locale.english}
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
        padding: 16,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    instructionsContainer: {
        maxWidth: 414,
        marginVertical: 16,
    },
    instructionsText: {
        fontSize: windowWidth > 410 ? 18 : 16,
        // color: Colors.text, // Color will come from Paper theme
        textAlign: 'center',
    },
    boardContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    pickerContainer: {
        marginTop: 32,
        marginBottom: 16,
        alignItems: 'center',
    },
    picker: {
        width: windowWidth * 0.6,
        maxWidth: 250,
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 414,
        paddingVertical: 8,
    },
    footerText: {
        // color: Colors.text, // Color will come from Paper theme
    },
});

export default GameScreen;
