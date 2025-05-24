import { DefaultTheme } from 'react-native-paper';
import Colors from '../constants/colors'; // Your existing colors

const AppTheme = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.button,
        accent: Colors.tile8,
        background: Colors.background,
        surface: Colors.scoreBoard,
        text: Colors.text,
        placeholder: Colors.emptyTile,
        // Custom colors
        tile2: Colors.tile2,
        tile4: Colors.tile4,
        tile8: Colors.tile8,
        tile16: Colors.tile16,
        tile32: Colors.tile32,
        tile64: Colors.tile64,
        tile128: Colors.tile128,
        tile256: Colors.tile256,
        tile512: Colors.tile512,
        tile1024: Colors.tile1024,
        tile2048: Colors.tile2048,
        scoreBoard: Colors.scoreBoard,
        board: Colors.board,
        emptyTile: Colors.emptyTile,
    },
};

export default AppTheme;
