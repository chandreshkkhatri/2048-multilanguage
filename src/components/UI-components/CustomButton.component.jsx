import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';

const CustomButton = ({
    title,
    onPressFunction,
    containerStyle,
    textStyle,
}) => {
    return (
        <PaperButton
            mode="contained"
            onPress={onPressFunction}
            style={{ ...styles.container, ...containerStyle }}
            labelStyle={{ ...styles.text, ...textStyle }}
        >
            {title}
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    text: {
        color: 'white',
    },
});

export default CustomButton;
