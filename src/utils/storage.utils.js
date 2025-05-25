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
        const bestGameScoreString = await AsyncStorage.getItem('bestGameScore');

        if (!bestGameScoreString) return 0;

        return parseInt(bestGameScoreString, 10); // Parse to integer
    } catch (err) {
        console.log(err);
        return 0; // Return a default value in case of error
    }
};
