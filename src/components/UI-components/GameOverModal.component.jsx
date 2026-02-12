import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
    Modal as PaperModal,
    Portal,
    Text as PaperText,
    Button as PaperButton,
    Surface,
    useTheme,
} from 'react-native-paper';

import Logo from './Logo.component';
import i18n from '../../services/internationalization/i18n';
import { getTranslatedNumber } from '../../utils/i18n.utils';

const windowWidth = Dimensions.get('window').width;

const GameOverModal = ({ visible, onPressFunction }) => {
    const theme = useTheme();
    const score = useSelector((state) => state.game.score);

    return (
        <Portal>
            <PaperModal
                visible={visible}
                onDismiss={onPressFunction}
                contentContainerStyle={[styles.modalContainer, { backgroundColor: theme.colors.background }]}
            >
                <Surface style={styles.surface}>
                    <Logo
                        containerStyle={styles.logoContainer}
                        textStyle={styles.logoText}
                    />

                    <PaperText
                        style={styles.score}
                    >{`${i18n.t('yourScoreIs')} ${getTranslatedNumber(score)}`}</PaperText>

                    <PaperButton
                        mode="contained"
                        onPress={onPressFunction}
                        style={styles.buttonStyle}
                        labelStyle={styles.buttonText}
                    >
                        {i18n.t('newGame')}
                    </PaperButton>
                </Surface>
            </PaperModal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    surface: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        minHeight: 250,
        elevation: 4,
        borderRadius: 8,
    },
    logoContainer: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    logoText: {
        fontSize: windowWidth > 410 ? 36 : 28,
    },
    score: {
        fontSize: windowWidth > 410 ? 24 : 18,
        marginVertical: 20,
        textAlign: 'center',
    },
    buttonStyle: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 20,
    },
    buttonText: {
        fontSize: windowWidth > 410 ? 20 : 16,
    },
});

export default GameOverModal;
