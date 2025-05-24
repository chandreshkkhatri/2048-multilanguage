import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import CustomText from './CustomText.component';

const CustomButton = ({
    title,
    onPressFunction,
    containerStyle,
    textStyle,
}) => {
    return (
        <Pressable
            style={{ ...styles.container, ...containerStyle }}
            onPress={onPressFunction}
        >
            <CustomText style={{ ...styles.text, ...textStyle }}>
                {title}
            </CustomText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: 220,
        // height: 65,
        // backgroundColor: '#C2B3A3',
        borderRadius: 5,
    },
    text: {
        // fontSize: 32,
        color: 'white',
    },
});

export default CustomButton;
