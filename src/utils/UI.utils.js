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
        const baseFontSize = (deviceWidth - 30) / 10; // Adjusted base calculation slightly for more range

        if (number >= 10000) {
            // 5+ digits (e.g., 16384)
            return baseFontSize - 12;
        } else if (number >= 1000) {
            // 4 digits (e.g., 1024, 2048, 4096, 8192)
            return baseFontSize - 9;
        } else if (number >= 100) {
            // 3 digits (e.g., 128, 256, 512)
            return baseFontSize - 6;
        } else if (number >= 10) {
            // 2 digits (e.g., 16, 32, 64)
            return baseFontSize - 3;
        } else {
            // 1 digit (e.g., 2, 4, 8)
            return baseFontSize;
        }
    };

    return {
        color: number > 4 ? 'white' : Colors.text,
        fontSize: getFontSize(),
    };
};
