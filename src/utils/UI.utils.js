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
        case 2048:
            return Colors.tile2048;
        case 4096:
            return Colors.tile4096;
        case 8192:
            return Colors.tile8192;
        default:
            return Colors.tile16384;
    }
};

export const getTextStyle = (number, deviceWidth) => {
    const getFontSize = () => {
        // Reduced base font size calculation for smaller numbers
        const baseFontSize = (deviceWidth - 30) / 14; // Changed divisor from 10 to 14

        if (number >= 10000) {
            // 5+ digits (e.g., 16384)
            return baseFontSize - 11; // Adjusted subtraction
        } else if (number >= 1000) {
            // 4 digits (e.g., 1024, 2048, 4096, 8192)
            return baseFontSize - 8; // Adjusted subtraction
        } else if (number >= 100) {
            // 3 digits (e.g., 128, 256, 512)
            return baseFontSize - 5; // Adjusted subtraction
        } else if (number >= 10) {
            // 2 digits (e.g., 16, 32, 64)
            return baseFontSize - 2; // Adjusted subtraction
        } else {
            // 1 digit (e.g., 2, 4, 8)
            return baseFontSize;
        }
    };

    return {
        color: number > 4 ? 'white' : Colors.text,
        fontSize: getFontSize(),
        fontWeight: 'bold',
    };
};
