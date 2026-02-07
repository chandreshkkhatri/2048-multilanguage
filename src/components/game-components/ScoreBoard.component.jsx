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
        height: windowHeight * 0.09,
        maxHeight: 70,
        backgroundColor: Colors.scoreBoard,
        justifyContent: 'center',
        paddingVertical: 4,
    },
    title: {
        fontSize: windowWidth > 410 ? 16 : 13,
        textAlign: 'center',
        marginBottom: 2,
    },
    score: {
        fontSize: windowWidth > 410 ? 20 : 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ScoreBoard;
