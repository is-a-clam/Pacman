// a melonJS data manifest
// note : this is note a webpack manifest
const DataManifest = [
    // Map
    { name: "maps", type: "json", src:  "./data/maps/maps.json" },
    { name: "level1", type: "tmx", src: "./data/maps/level1.tmx"},
    // Sprites
    { name: "pacman", type: "image", src: "./data/images/pacman.png" },
    { name: "wall", type: "image", src: "./data/images/wall.png" },
    { name: "food", type: "image", src: "./data/images/food.png" },
    { name: "pill", type: "image", src: "./data/images/pill.png" }
];

export default DataManifest;
