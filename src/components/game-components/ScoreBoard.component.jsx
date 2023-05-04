import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import Card from '../UI-components/Card.component';
import CustomText from '../UI-components/CustomText.component';

import Colors from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;

const ScoreBoard = ({ title, score }) => {
    return (
        <Card style={styles.container}>
            <CustomText style={styles.title}>{title}</CustomText>
            <CustomText style={styles.score}>{score}</CustomText>
        </Card>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '45%',
        height: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Colors.scoreBoard,
    },
    title: {
        fontSize: windowWidth > 410 ? 22 : 16,
        color: '#eee4da',
    },
    score: {
        fontSize: windowWidth > 410 ? 28 : 20,
        color: 'white',
    },
});

export default ScoreBoard;
