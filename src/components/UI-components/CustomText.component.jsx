import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText } from 'react-native-paper';

const CustomText = ({ style, children }) => {
    return (
        <PaperText style={{ ...styles.text, ...style }}>{children}</PaperText>
    );
};

const styles = StyleSheet.create({
    text: {},
});

export default CustomText;
