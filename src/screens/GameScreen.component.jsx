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
const windowHeight = Dimensions.get('window').height; // Get window height

// Board width constants for consistent layout
const BOARD_WIDTH = 374; // Updated to match Board.component.jsx actual width
const BOARD_MAX_WIDTH = 374; // Updated to match Board.component.jsx actual width

const GameScreen = () => {
    const isGameOver = useSelector((state) => state.game.isGameOver);

    const [modalVisibility, setModalVisibility] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(Locale.english);

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
                        // itemStyle={styles.pickerItem} // Apply itemStyle to the Picker itself if supported for general item styling
                    >
                        <Picker.Item
                            label="Sanskrut - संस्कृत"
                            value={Locale.sanskrut}
                            style={styles.pickerItem} // Apply to each item
                        />
                        <Picker.Item
                            label="Hindi - हिंदी"
                            value={Locale.hindi}
                            style={styles.pickerItem} // Apply to each item
                        />
                        <Picker.Item
                            label="Marathi - मराठी"
                            value={Locale.marathi}
                            style={styles.pickerItem} // Apply to each item
                        />
                        <Picker.Item
                            label="Punjabi - ਪੰਜਾਬੀ"
                            value={Locale.punjabi}
                            style={styles.pickerItem} // Apply to each item
                        />
                        <Picker.Item
                            label="English - English"
                            value={Locale.english}
                            style={styles.pickerItem} // Apply to each item
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
        paddingTop: windowHeight * 0.12, // Increased paddingTop to shift content further down
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    instructionsContainer: {
        width: BOARD_WIDTH,
        maxWidth: BOARD_MAX_WIDTH,
        alignSelf: 'center',
        marginVertical: windowHeight * 0.02, // Adjusted from 0.015
    },
    instructionsText: {
        fontSize: windowWidth > 410 ? 18 : 16,
        textAlign: 'center',
    },
    boardContainer: {
        alignItems: 'center',
        width: BOARD_WIDTH,
        maxWidth: BOARD_MAX_WIDTH,
        alignSelf: 'center',
        marginVertical: windowHeight * 0.025, // Adjusted from 0.02
    },
    pickerContainer: {
        marginTop: windowHeight * 0.02, // Adjusted to be 2% of screen height
        marginBottom: windowHeight * 0.01, // Adjusted to be 1% of screen height
        alignItems: 'center',
        borderWidth: 1, // Add border
        borderColor: Colors.text, // Use a color from your theme, e.g., Colors.text or a specific border color
        borderRadius: 8, // Optional: for rounded corners
        width: windowWidth * 0.6, // Ensure container takes up the picker width
        maxWidth: 250, // Ensure container takes up the picker maxwidth
    },
    picker: {
        width: '100%', // Make picker fill the container
        // For Android, centering text might need platform-specific handling or a custom dropdown component
        // For iOS, itemStyle can be used, but Picker from @react-native-picker/picker might not support it directly for all platforms.
        // textAlign: 'center', // This might not work directly on Picker items for all platforms
    },
    // Add this new style for Picker.Item if direct styling on Picker doesn't work for text alignment
    pickerItem: {
        // This is a common way to attempt to style Picker items, but support varies.
        textAlign: 'center', // This might not work.
        // For Android, you often have to rely on the native appearance or use a custom component.
        // Note: For some versions/platforms, you might need to wrap text in a <Text> component inside Picker.Item and style that.
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: 414,
        paddingVertical: windowHeight * 0.005, // Adjusted to be 0.5% of screen height
    },
    footerText: {
        // color: Colors.text, // Color will come from Paper theme
    },
});

export default GameScreen;
