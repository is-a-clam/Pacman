class Direction {
    static up = 1
    static right = 2
    static down = 3
    static left = 4

    static opposite(direction) {
        return ((direction + 1) % 4) + 1
    }

    static directions() {
        return [1, 2, 3, 4]
    }
}

export default Direction
