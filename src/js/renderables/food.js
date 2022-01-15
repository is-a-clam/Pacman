import * as me from 'melonjs/dist/melonjs.module.js';

import CONSTANTS from '../constants.js';

class Food extends me.Sprite {

    constructor(row, col) {
        let coord = me.state.current().tileToPixel(row, col);
        super(coord.x, coord.y, {
            image: me.loader.getImage("food"),
            width: CONSTANTS.TILE_SIZE,
            height: CONSTANTS.TILE_SIZE
        });
    }

    update(dt) {
        super.update(dt);
        return true;
    }
}

export default Food;
