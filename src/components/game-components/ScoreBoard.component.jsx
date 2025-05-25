import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card as PaperCard, Text as PaperText } from 'react-native-paper';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScoreBoard = ({ title, score }) => {
    return (
        <PaperCard style={styles.container}>
            <PaperCard.Content>
                <PaperText style={styles.title}>{title}</PaperText>
                <PaperText style={styles.score}>{score}</PaperText>
            </PaperCard.Content>
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '45%',
        height: windowHeight * 0.14, // Increased from 0.12 to 0.14
        maxHeight: 100, // Increased from 90 to 100
        backgroundColor: Colors.scoreBoard,
        justifyContent: 'center',
        paddingVertical: 8, // Increased padding
    },
    title: {
        fontSize: windowWidth > 410 ? 18 : 14, // Further reduced from 20:16
        textAlign: 'center',
        marginBottom: 4,
    },
    score: {
        fontSize: windowWidth > 410 ? 22 : 18, // Further reduced from 26:20
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ScoreBoard;
