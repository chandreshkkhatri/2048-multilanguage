import AsyncStorage from '@react-native-async-storage/async-storage';

export const setBestGameScore = async (newGameScore) => {
    try {
        await AsyncStorage.setItem('bestGameScore', `${newGameScore}`);
    } catch (err) {
        console.log(err);
    }
};

export const getBestGameScore = async () => {
    try {
        const bestGameScore = await AsyncStorage.getItem('bestGameScore');

        if (!bestGameScore) return 0;

        return bestGameScore;
    } catch (err) {
        console.log(err);
    }
};
