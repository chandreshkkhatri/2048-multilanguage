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
            mode="contained" // Default mode, can be customized
            onPress={onPressFunction}
            style={{ ...styles.container, ...containerStyle }}
            labelStyle={{ ...styles.text, ...textStyle }} // Map textStyle to labelStyle
        >
            {title}
        </PaperButton>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        // backgroundColor is handled by PaperButton's theme or can be overridden in containerStyle
    },
    text: {
        color: 'white', // This might be overridden by PaperButton's theme, adjust as needed
        // fontSize can be part of textStyle
    },
});

export default CustomButton;
