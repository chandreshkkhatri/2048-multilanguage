import Colors from '../constants/colors';

export const getTileColor = (number) => {
    switch (number) {
        case 2:
            return Colors.tile2;
        case 4:
            return Colors.tile4;
        case 8:
            return Colors.tile8;
        case 16:
            return Colors.tile16;
        case 32:
            return Colors.tile32;
        case 64:
            return Colors.tile64;
        case 128:
            return Colors.tile128;
        case 256:
            return Colors.tile256;
        case 512:
            return Colors.tile512;
        case 1024:
            return Colors.tile1024;
        default:
            return Colors.tile2048;
    }
};

export const getTextStyle = (number, deviceWidth) => {
    const getFontSize = () => {
        const fontSize = (deviceWidth - 30) / 12; // Changed divisor from 10 and removed +2

        if (number > 1000) return fontSize - 8; // Keeps the existing reduction for large numbers

        return fontSize;
    };

    return {
        color: number > 4 ? 'white' : Colors.text,
        fontSize: getFontSize(),
    };
};
