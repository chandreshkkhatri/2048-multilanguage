import React from 'react';
import { Modal, Dimensions, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Logo from './Logo.component';
import CustomButton from './CustomButton.component';
import CustomText from './CustomText.component';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

const GameOverModal = ({ visible, onPressFunction }) => {
    const score = useSelector((state) => state.game.score);

    return (
        <Modal animationType="fade" visible={visible}>
            <View style={styles.screen}>
                <View style={styles.container}>
                    <Logo
                        containerStyle={styles.logoContainer}
                        textStyle={styles.logoText}
                    />

                    <CustomText
                        style={styles.score}
                    >{`Your score is: ${score}`}</CustomText>

                    <CustomButton
                        title="NEW GAME"
                        onPressFunction={onPressFunction}
                        containerStyle={styles.buttonStyle}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
    container: {
        height: 250,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoContainer: {
        width: 120,
        height: 120,
    },
    logoText: {
        fontSize: windowWidth > 410 ? 42 : 32,
    },
    score: {
        fontSize: windowWidth > 410 ? 28 : 16,
        color: Colors.text,
    },
    buttonStyle: {
        width: 220,
        height: 65,
        backgroundColor: '#C2B3A3',
    },
    buttonText: {
        fontSize: 32,
    },
});

export default GameOverModal;
