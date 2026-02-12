import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Linking, StyleSheet, SafeAreaView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { Surface, Text as PaperText, IconButton, useTheme } from 'react-native-paper';

import { initGameAction } from '../redux/actions/game.actions';
import { useAppTheme } from '../theme/ThemeContext';

import Header from '../components/UI-components/Header.component';

import Board from '../components/game-components/Board.component';
import GameOverModal from '../components/UI-components/GameOverModal.component';

import { BOARD_SIZE } from '../constants/layout';
import i18n, { detectedLocale } from '../services/internationalization/i18n';
import { Locale } from '../commons/types/i18n';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const GameScreen = () => {
    const theme = useTheme();
    const { isDark, toggleTheme } = useAppTheme();
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
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
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

                    <View style={{ flex: 1 }} />

                    <View style={styles.settingsRow}>
                        <IconButton
                            icon={isDark ? 'weather-sunny' : 'weather-night'}
                            size={24}
                            onPress={toggleTheme}
                            iconColor={theme.colors.text}
                        />
                        <View style={[styles.pickerContainer, { borderColor: theme.colors.text }]}>
                            <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue) => {
                                    i18n.locale = itemValue;
                                    setSelectedLanguage(itemValue);
                                }}
                                style={[styles.picker, { color: theme.colors.text }]}
                                dropdownIconColor={theme.colors.text}
                            >
                                <Picker.Item
                                    label="Sanskrut - \u0938\u0902\u0938\u094D\u0915\u0943\u0924"
                                    value={Locale.sanskrut}
                                    style={styles.pickerItem}
                                    color={theme.colors.text}
                                />
                                <Picker.Item
                                    label="Hindi - \u0939\u093F\u0902\u0926\u0940"
                                    value={Locale.hindi}
                                    style={styles.pickerItem}
                                    color={theme.colors.text}
                                />
                                <Picker.Item
                                    label="Marathi - \u092E\u0930\u093E\u0920\u0940"
                                    value={Locale.marathi}
                                    style={styles.pickerItem}
                                    color={theme.colors.text}
                                />
                                <Picker.Item
                                    label="Punjabi - \u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40"
                                    value={Locale.punjabi}
                                    style={styles.pickerItem}
                                    color={theme.colors.text}
                                />
                                <Picker.Item
                                    label="English - English"
                                    value={Locale.english}
                                    style={styles.pickerItem}
                                    color={theme.colors.text}
                                />
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <PaperText style={styles.footerText}>
                            {i18n.t('developedBy')}
                        </PaperText>
                        <Image
                            source={require('../../assets/logo.png')}
                            style={styles.footerLogo}
                        />
                        <PaperText
                            style={[styles.footerLink, { color: theme.colors.primary }]}
                            onPress={() => Linking.openURL('https://www.karmalok.com')}
                        >
                            {i18n.t('developerName')}
                        </PaperText>
                    </View>
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
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: windowHeight * 0.06 + 25,
        paddingHorizontal: 16,
        paddingBottom: windowHeight * 0.04,
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
        marginVertical: 16,
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
        marginTop: 16,
        marginBottom: 0,
    },
    settingsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    pickerContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        width: windowWidth * 0.5,
        maxWidth: 220,
    },
    picker: {
        width: '100%',
    },
    pickerItem: {
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 414,
        paddingVertical: 4,
        gap: 6,
    },
    footerText: {},
    footerLogo: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    footerLink: {
        textDecorationLine: 'underline',
    },
});

export default GameScreen;
