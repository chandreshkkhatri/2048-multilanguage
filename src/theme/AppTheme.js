import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const createAppTheme = (colors, isDark) => {
    const baseTheme = isDark ? MD3DarkTheme : MD3LightTheme;

    return {
        ...baseTheme,
        roundness: 8,
        colors: {
            ...baseTheme.colors,
            primary: colors.button,
            accent: colors.tile8,
            background: colors.background,
            surface: colors.background,
            onSurface: colors.text,
            text: colors.text,
            placeholder: colors.emptyTile,
            // Custom game colors
            tile2: colors.tile2,
            tile4: colors.tile4,
            tile8: colors.tile8,
            tile16: colors.tile16,
            tile32: colors.tile32,
            tile64: colors.tile64,
            tile128: colors.tile128,
            tile256: colors.tile256,
            tile512: colors.tile512,
            tile1024: colors.tile1024,
            tile2048: colors.tile2048,
            scoreBoard: colors.scoreBoard,
            board: colors.board,
            emptyTile: colors.emptyTile,
        },
    };
};
