import React from 'react';
import { StyleSheet } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

const Card = ({ style, children }) => {
    return (
        <PaperCard style={{ ...styles.card, ...style }}>{children}</PaperCard>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        elevation: 4, // Added elevation for Paper Card
    },
});

export default Card;
