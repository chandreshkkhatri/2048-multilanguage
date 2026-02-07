export const GRID_SIZE = 4;
export const TILE_SIZE = 80;
export const TILE_GAP = 10;
export const TILE_STRIDE = 81; // distance between tile left edges in adjacent cells
export const BOARD_SIZE = 374;
export const ANIMATION_DURATION = 100; // ms

// Compute the pixel offset for a tile at the given grid index
export const tilePosition = (index) => index * TILE_STRIDE + (index + 1) * TILE_GAP;
