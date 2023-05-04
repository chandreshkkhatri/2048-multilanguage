class Tile {
    constructor(number, currentPosition) {
        this.number = number;
        this.currentPosition = currentPosition;
        this.previousPosition = currentPosition;
        this.isNew = true;
        this.isMerged = false;
    }
}

export default Tile;
