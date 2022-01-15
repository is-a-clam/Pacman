import * as me from "melonjs/dist/melonjs.module.js"

import CONSTANTS from "../constants.js"

class Ghost extends me.Sprite {
    constructor(row, column, image) {
        super(coord.x, coord.y, {
            image: me.loader.getImage("name"),
            width: CONSTANTS.TILE_SIZE,
            height: CONSTANTS.TILE_SIZE,
        })

        this.phase = this.target = this.speed = CONSTANTS.TILE_SIZE * 8
    }

    update(dt) {
        super.update(dt)
        return true
    }
}

export default Food
