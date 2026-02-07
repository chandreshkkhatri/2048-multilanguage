import { Dimensions } from 'react-native';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

export const GRID_SIZE = 4;
export const ANIMATION_DURATION = 100; // ms

// Board fits within screen width (with padding) and caps vertical usage
const widthBudget = windowWidth - 32;     // 16px padding each side
const heightBudget = windowHeight * 0.48; // leave ~52% for header/footer/picker
const rawSize = Math.min(widthBudget, heightBudget, 500);

export const TILE_GAP = Math.max(4, Math.round(rawSize * 0.027));
export const TILE_SIZE = Math.floor(
    (rawSize - (GRID_SIZE + 1) * TILE_GAP) / GRID_SIZE
);
export const BOARD_SIZE = (GRID_SIZE + 1) * TILE_GAP + GRID_SIZE * TILE_SIZE;

// Compute the pixel offset for a tile at the given grid index
export const tilePosition = (index) => TILE_GAP + index * (TILE_SIZE + TILE_GAP);
