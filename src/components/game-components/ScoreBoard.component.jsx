import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Card as PaperCard, Text as PaperText, useTheme } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ScoreBoard = ({ title, score }) => {
    const theme = useTheme();

    return (
        <PaperCard style={[styles.container, { backgroundColor: theme.colors.scoreBoard }]}>
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
