// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
    // Map
    {
        name: "maps",
        type: "json",
        src: "./data/maps/maps.json",
    },
    {
        name: "level1",
        type: "tmx",
        src: "./data/maps/level1.tmx",
    },
    // Sprites
    {
        name: "pacman",
        type: "image",
        src: "./data/images/pacman.png",
    },
    {
        name: "blinky",
        type: "image",
        src: "./data/images/blinky.png",
    },
    {
        name: "clyde",
        type: "image",
        src: "./data/images/clyde.png",
    },
    {
        name: "inky",
        type: "image",
        src: "./data/images/inky.png",
    },
    {
        name: "pinky",
        type: "image",
        src: "./data/images/pinky.png",
    },
    {
        name: "wall",
        type: "image",
        src: "./data/images/wall.png",
    },
    {
        name: "food",
        type: "image",
        src: "./data/images/food.png",
    },
    {
        name: "pill",
        type: "image",
        src: "./data/images/pill.png",
    },
]

export default DataManifest
