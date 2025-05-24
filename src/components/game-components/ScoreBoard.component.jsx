import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card as PaperCard, Text as PaperText } from 'react-native-paper';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

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
        height: '100%',
        backgroundColor: Colors.scoreBoard,
        justifyContent: 'center',
    },
    title: {
        fontSize: windowWidth > 410 ? 20 : 14,
        textAlign: 'center',
        marginBottom: 4,
    },
    score: {
        fontSize: windowWidth > 410 ? 26 : 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ScoreBoard;
