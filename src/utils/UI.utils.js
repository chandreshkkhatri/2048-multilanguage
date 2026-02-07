import Colors from '../constants/colors';
import { TILE_SIZE } from '../constants/layout';

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

export const getTextStyle = (number) => {
    const getFontSize = () => {
        const baseFontSize = TILE_SIZE * 0.31;
        const scale = TILE_SIZE / 80;

        if (number >= 10000) {
            return baseFontSize - 11 * scale;
        } else if (number >= 1000) {
            return baseFontSize - 8 * scale;
        } else if (number >= 100) {
            return baseFontSize - 5 * scale;
        } else if (number >= 10) {
            return baseFontSize - 2 * scale;
        } else {
            return baseFontSize;
        }
    };

    return {
        color: number > 4 ? 'white' : Colors.text,
        fontSize: getFontSize(),
        fontWeight: 'bold',
    };
};
