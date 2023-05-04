import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ style, children }) => {
    return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
    },
});

export default Card;
